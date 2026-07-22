# states

# AI Tools

The following AI tools were used:

- OpenRouter API
- Cline for VS Code
- Model google/gemini-3.1-flash-lite in the Plan mode by default

Github Copilot in the Auto mode was used for auto-complete

# Project setup

Run the following commands:

- cp .env.example .env
- cp .env.test.example .env.test

Edit DATABASE_URL in .env and .env.test to match your PG configuration. Then run:

- npm install
- npm run db:reset
- npm run db:migrate
- npm run db:seed

# Running Vitest

Run the following commands:

- npm run db:test:reset
- npm run db:test:migrate
- npm run test:unit

# Running Playwright

Run the following commands:

- npx playwright install
- npm run test:e2e

# Running development

Run the following commands:

- npm run dev:api
- npm run dev:web

Open browser at http://localhost:5173

# Running the Docker image

## How to Use:

- **Ensure you have a `.env` file:** Make sure your `.env` file (containing necessary secrets/configurations like `DATABASE_URL`) is present in the root directory.
- **Start the container:** Run `npm run docker:up` in your terminal.
- **Seed the database with:**_ `docker compose exec app npm run db:seed`
- **Check the application:** Open `http://localhost:3000` in your web browser to verify the app is running.
- **Stop and clean up:** When done, run `npm run docker:down` to stop and remove the container.
