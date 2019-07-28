# ShawdowClone Truth

## Overview
This project consists of 3 parts
- `React Frontend`
- `Node backend server`
- `Prisma server connected to PostgreSQL`.

> **Note**: [Prisma](https://www.prisma.io) is a database abstraction layer that turns your databases into GraphQL APIs with CRUD operations and realtime capabilities. It is the glue between your database and GraphQL server.
<div style="text-align: center;">
<img src="https://imgur.com/OyIQQxF.png" width="800" height="150" float='right' /></div>

## Local Installation Guide
### 1. Download the source & install dependencies

Clone the repository with the following command:

```sh
git clone https://github.com/mraybman/shadowclone_truth.git
```

Next, navigate into the project folder of downloaded source and install the NPM dependencies:

```sh
cd shadowclone_truth
yarn install (or npm install)
```

### 2. Deploy the Prisma database service
Before run backend server, we should run the prisma server first to connect backend graphql server and database.

To start prisma server, we have two options  
- run prisma local server with docker
- use prisma server based on prisma cloud service
#### Start prisma server with docker locally

You can now [deploy](https://www.prismagraphql.com/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov) the Prisma service locally ( note that this requires you to have [Docker](https://www.docker.com) installed on your machine ):
 ```sh
npm install -g prisma
docker-compose up -d
prisma deploy
```
<details>
  When using prisma server on docker, we should provide correct docker export endpoint to prisma.<br>
  The default env setting:<br>
  <code>export PRISMA_ENDPOINT="http://localhost:4466"</code>
</details>

#### Use prisma server based on prisma cloud service
We can use prisma server existing on prisma cloud service without running locally.
<details>
  When using prisma cloud, we should provide correct server url.<br>
  The default env setting:<br>
  <code>export PRISMA_ENDPOINT="https://us1.prisma.sh/reopard226-550894/server/dev"</code><br>
  <code>export PRISMA_SECRET="prisma-secret-226"</code>
</details>

### 3. Start the GraphQL server

The Prisma database service that's backing your GraphQL server is now available. This means you can now start the server:

```sh
yarn start (or npm start)
```
<details>
  When start local backend server we should set correct environment variables.<br>
  The default env setting:<br>
  <code>export SERVER_PORT=8000</code><br>
  <code>export REACT_APP_GRAPHQL_ENDPOINT="http://localhost:8000/graphql"</code>
</details>

The `start` script starts the server (e.g.  `http://localhost:8000`) and opens a GraphQL Playground ( e.g. `http://localhost:8000/graphql` ) where you get acces to the API of your GraphQL server (defined in the [application schema](./src/schema.graphql)) as well as the underlying Prisma API (defined in the auto-generated [Prisma database schema](./src/generated/prisma.ts)) directly.

Inside the Playground, you can start exploring the available operations by browsing the built-in documentation.

The `start` script also builds the frontend app and serve it on the local server
(e.g.  `http://localhost:8000`)

For development, we can run `dev` scripts to suport hot reloading dev environment without building frontend app.

> **Note**: To run project successfully, we should provide correct env variables.