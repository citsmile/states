# Project setup

Please, create and configure an Express.js + React.js project. I want the following structure of directories:
- apps
- apps/web
- apps/api
- playwright

In apps/api, there should be an Express.js server with mjs files. It should have a single /health endpoint that returns status 200. 

In apps/web there should be a React + Vite app with a default page and layout. The page should render a Home component with h1 with text 'States'.

I want a test environment to be configured for Vitest. Let there be a small test for the Home component that verifies that it renders h1 'States'.

There should be a single packgage.json file for both parts of the app. The package.json should include Prisma for PostgreSQL.

The .env file should contain a set of common variables, specifically I expect BASE_URL and DATABASE_URL for Postgres.

In playwright, there should be Playwright set up. Playwright should rely on .env.test with a different DATABASE_URL. 

What's the plan?

# The first Playwright test

Let's add the first Playwright test that starts the app and checks that the page with title States has appeared.