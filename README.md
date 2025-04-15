# ExpenseTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

Recommended Integrated Development Environment (IDE): Visual Studio Code

## Start ExpenseTracker on a local development server

Step 1: Clone and open the application in IDE

Step 2: Execute: npm install

Step 3: Launch a new Terminal Window and execute: npm run server (This will launch the Categories and Expenses API Services).

The Terminal Window will display the following output once the API Services start up successfully

```bash
 D:\Technical\Applications\Angular\expense-tracker> npm run server

> expense-tracker@0.0.0 server
> json-server --watch src/data/expense-tracker-db.json --port 3000

--watch/-w can be omitted, JSON Server 1+ watches for file changes by default
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching src/data/expense-tracker-db.json...

♡⸜(˶˃ ᵕ ˂˶)⸝♡

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/expenses
http://localhost:3000/categories
```

Step 4: Launch a new Terminal Window and execute: ng serve (This will launch the ExpenseTracker application).

The Terminal Window will display the following output once the ExpenseTracker Application starts up successfully

```bash
PS D:\Technical\Applications\Angular\expense-tracker> ng serve
Component HMR has been enabled.
If you encounter application reload issues, you can manually reload the page to bypass HMR and/or disable this feature with the `--no-hmr` command line option.
Please consider reporting any issues you encounter here: https://github.com/angular/angular-cli/issues

Initial chunk files | Names         |  Raw size
polyfills.js        | polyfills     |  90.20 kB |
main.js             | main          |  69.25 kB |
styles.css          | styles        |   8.27 kB |

                    | Initial total | 167.72 kB

Application bundle generation complete. [3.385 seconds]

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`

The application will automatically reload whenever you modify any of the source files.

## IMPORTANT: ExpenseTracker Expenses and Categories API Endpoint Procedures

Note: Enter ctrl-c then Y to stop the Expenses and Categories Endpoint services when finished using the application

Example: ^C^CTerminate batch job (Y/N)? Y

## IMPORTANT: If you close your Terminal for the Categories and Expenses API Endpoints services without stopping the API Endpoint services

You will need to reboot or use netstat to kill the tasks

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
