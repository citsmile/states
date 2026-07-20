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

# Prisma setup

The next step is to initialize Prisma. Prisma will need npm commands in package.json including reset, migrate, and migrate with --create-only flag.

Let's define the schema which will contain tables State and County. Model State will contain id, name, population (integer), and collection Counties. Model County will contain id, stateId, name, population (integer), and  reference to State through stateId.

Also, let's create a seeds file which I will fill out manually later.

# Seeding from fixtures

In prisma/fixtures/states and prisma/fixtures/usa-states there are json files which are the source for seeds. Please, write function seed() in seeds.ts that will:
- take usa-states.json and import its content into table State. It should import population from property population) and name (from property state.
- for each state in usa-states.json there is a separate json file in prisma/states. Import its data into table County. The mapping is: stateId = state.id, population = property population, name = property county.
