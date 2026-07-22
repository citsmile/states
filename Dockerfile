# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies (including devDependencies needed for build)
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Generate Prisma client and build web app
RUN npx prisma generate
RUN npm run build:web

# ---

# Dependencies stage (prune devDependencies)
FROM node:22-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---

# Runtime stage
FROM node:22-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy built assets
COPY --from=build /app/apps/web/dist ./apps/web/dist
COPY --from=build /app/apps/api ./apps/api
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy package.json (might be needed for some runtime scripts/configs)
COPY package.json .
COPY prisma.config.ts ./

# Expose API port
EXPOSE 3000

# Run migrations, seed, and start server
# CMD ["sh", "-c", "exec npx tsx apps/api/server.ts"]
CMD ["sh", "-c", "npx prisma migrate deploy && exec npx tsx apps/api/server.ts"]
