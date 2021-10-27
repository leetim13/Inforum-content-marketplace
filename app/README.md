# inforum app

<img src="../logo.png" alt="Company logo"/>

Table of Contents
---

- [Client App](./client)
- [Server App](./server)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### App Prerequisites

* A terminal to run the [bootstrap script](https://github.com/dcsil/Inforum/tree/set-up-bootstrap-service-yml/app/script).
* [Download](https://www.pgadmin.org/download/) pgAdmin4 to work with postgreSQL easier.

### Local Environment Set-up
You can set up and run our application by cloning this git repository.
```
$ git clone https://github.com/dcsil/Inforum.git
```

After cloning, please run the [bootstrap script](https://github.com/dcsil/Inforum/tree/set-up-bootstrap-service-yml/app/script) in your terminal.
> Note: It might prompt for your system administrator password, if you do not have node.js installed.

#### Postgres Database Set-up

Set up a local database with pgAdmin4 and edit the `./server/config/config.json` file with your postgres `username`, `password` and `database`.

Run migration and seed your local database with 
  ```
  $ cd server
  $ npx sequelize-cli db:migrate
  $ npx sequelize-cli db:seed:all
  ``` 

### Start app

#### Client
Navigate to the `app/client/` directory and run the server from command line:
   ``` 
   $ npm start
   ```
   
to run tests, run ``` npm test ```

#### Server
Navigate to the `app/server/` directory and run the server from command line:
   ``` 
   $ npm start
   ```
   
to run tests, run ``` npm test ```

## Deployment
### Continuous Integration 

Using Github actions we have a CI script [here](https://github.com/dcsil/Inforum/blob/set-up-bootstrap-service-yml/.github/workflows/ci_pipeline.yml).

### Logging and exceptions 
Logging is set-up using Heroku add-ons for LogDNA.

Exceptions are tracked using Sentry. Paste your Sentry dsn inside `./server/index.js` and `./client/src/index.js` for server and client app.

### Continuous Deployment 

Using Github actions we have a CD script [here](https://github.com/dcsil/Inforum/blob/set-up-bootstrap-service-yml/.github/workflows/cd_pipeline.yml) that automatically deploys to Heroku.

Set up Github secrets for these 2 variables to link to your Heroku account: `HEROKU_API_KEY` ,`HEROKU_EMAIL`.

[Github Secrets Guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

#### Client app
Our client app is hosted here ``` https://inforum-client.herokuapp.com/ ```

Set up an Heroku Config Vars called `REACT_APP_SERVER_URL` with your server app url. 

[Heroku Config Vars Guide](https://devcenter.heroku.com/articles/config-vars)

#### Server app
Our server app is hosted here ``` https://inforum-server.herokuapp.com/api ```

Set up Heroku Config Vars called `SERVER_ENV` with value `production` and `CLIENT_URL` with your client app url. 

#### Database
We set up our postgres Test and Production database with Heroku add-ons to our server app.

Paste your Test database url to Github Secrets `HEROKU_TEST_DB_URL`, so CI would run properly.
