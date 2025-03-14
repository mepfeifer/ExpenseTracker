# ExpenseTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Start ExpenseTracker on a local development server

Step 1: Clone the application

Step 2: Execute: npm install

Step 3: Execute: npm run server (This will launch the Categories and Expenses API Services).

The Terminal Window will display the following output once the API Services start up successfully

```bash
Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/expenses
http://localhost:3000/categories
```

Step 4: Execute: ng serve (This will launch the ExpenseTracker application).

```bash
npm install
npm run server
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`

The application will automatically reload whenever you modify any of the source files.

## IMPORTANT: ExpenseTracker Expenses and Categories API Endpoint Procedures

Note: Enter ctrl-c then Y to stop the Expenses and Categories Endpoint services when finished using the application

Example: ^C^CTerminate batch job (Y/N)? Y

## IMPORTANT: If you close your Terminal for the Categories and Expenses API Endpoints services without stopping the API Endpoint services

You will need to use netstat to kill the tasks

For Windows OS: Launch a Commmand Prompt with an Admin User account

Then execute the following command: netstat -ano | findstr :3000

Followed by the following command: taskkill /PID (TaskId) /F (if any tasks are active for port 3000)

Example: taskkill /PID 123456 /F

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
