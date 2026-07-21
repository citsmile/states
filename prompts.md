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

# First request

The Home component should contain 3 components: StateList, DuplicateStateList, and StateDetails. StateList should have useEffect that goes to the API (`{BASE_URL}`/api/states`) and hit a server function states which will return all states from table State (id, name, population). In the render section, it should return a list with these states. What's the plan?

Please, also add a test to Home.test.tsx that checks that states are shown (the fetch function needs to be mocked).

And also in the Playwright spec let's check that states are shown (the database needs to be populated with 3 fake states in the setup section).

# Production-like Playwright

I want to switch Playwright to production mode. Part apps/web should be compiled as a static site. Package.json should contain test:web task that runs a the server in the mode in which calls like api/... are sent to apps/api/server.ts while all other requests are answered by the static React app. The test server should run on port 3001 and use the .env.test environment. How do we achieve this?

# The feature

Component StateDetails fetches endpoint /states/:id. Write an app.get function in server.ts that returns the specific state details along with a collection of associaled counties. Show the details and counties in StateDetails. Write new tests in apps/tests/components/StateDetails.test.tsx. Add a clause that clicks on a state and checks that state details appear in Home.test.tsx. Also, add the same clause to the Playwright tests in playwright/app.spec.ts.

Also, let's add SCSS and import them in Home.tsx. The statesPanel class should be flex and divs inside it should be placed from left to right and have a limited height with a vertical scroll.
