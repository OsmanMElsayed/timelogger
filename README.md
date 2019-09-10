## Development

In order to get the application up and running:
- `npm install` to install dependencies, 
- `npm start` runs the angular-client development server.

Execute `npm run test` to run the unit tests.

For linting execute `npm run lint` to lint the code

## Application Structure

This application is an angular application which consists of two feature modules modules and a shared module. The `ProjectsModule` and the `TimeEntriesModule` are the feature modules and they contain a set of UI components and angular services related to the feature concerning the module. And the `SharedModule` contains UI components that are meant to be shared across different feature areas throughout the whole application.

The client stores and reads the data in-memory, and due to time limitations the server side has not been implemented.

## Future Work:
- ~~Cover the `TimeEntriesModule` & the `SharedModule` with tests.~~
- Cover the application with end-to-end tests
- Develop the server-side and refactor the angular services to use the `HttpClient` in order to get the projects and the time entries data from the server and persist the newly created time entries in the server.
- Refactor the breadcrumb into a separate component and move it to the `SharedModule`.
