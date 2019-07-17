# Prisma-Apollo-Server For ShawdowClone Truth

This is the backend project for shadowcloen truth web application.

It provides graphql apis using Apollo server based on prisma framework

## Get started

> **Note**: `prisma` is listed as a _development dependency_ and _script_ in this project's [`package.json`](./package.json). This means you can invoke the Prisma CLI without having it globally installed on your machine (by prefixing it with `yarn`), e.g. `yarn prisma deploy` or `yarn prisma playground`. If you have the Prisma CLI installed globally (which you can do with `npm install -g prisma`), you can omit the `yarn` prefix.

### 1. Download the source & install dependencies

Clone the repository with the following command:

```sh
https://github.com/mraybman/shadowclone_truth.git
```

Next, navigate into the server folder of downloaded source and install the NPM dependencies:

```sh
cd shadowclone_truth/server
yarn install (or npm install)
```

### 2. Deploy the Prisma database service

You can now [deploy](https://www.prismagraphql.com/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov) the Prisma service (note that this requires you to have [Docker](https://www.docker.com) installed on your machine - if that's not the case, follow the collapsed instructions below the code block):

```sh
docker-compose up -d
prisma deploy
```

<details>
 <summary><strong>I don't have <a href="https://www.docker.com">Docker</a> installed on my machine</strong></summary>

To deploy your service to a public cluster (rather than locally with Docker), you need to perform the following steps:

1. Remove the `cluster` property from `prisma.yml`.
1. Run `prisma deploy`.
1. When prompted by the CLI, select a public cluster (e.g. `prisma-eu1` or `prisma-us1`).
1. Replace the [`endpoint`](./src/index.js#L23) in `index.ts` with the HTTP endpoint that was printed after the previous command.

</details>
<br>

### 3. Start the GraphQL server

The Prisma database service that's backing your GraphQL server is now available. This means you can now start the server:

```sh
yarn dev (or npm dev)
```

The `dev` script starts the server (on `http://localhost:4000`) and opens a GraphQL Playground where you get acces to the API of your GraphQL server (defined in the [application schema](./src/schema.graphql)) as well as the underlying Prisma API (defined in the auto-generated [Prisma database schema](./src/generated/prisma.ts)) directly.

Inside the Playground, you can start exploring the available operations by browsing the built-in documentation.
