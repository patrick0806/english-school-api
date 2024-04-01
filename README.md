# English School  API

## Project status: In Development

This api is to manage a school schedule, and matain contact with students

# API Development Process

This project is based on [NestJS](https://docs.nestjs.com/)

To running this project in dev mode you need threee things:

1. install dependences
2. Configure a local database
3. Run migrations
4. Run the app

These three steps are covered in sequence below

## Installation

```bash
yarn
```

## Docker-compose
In this project inside of dev folder we have a docker-compose with the project dependencies like Database and Redis
to start this dependencies run this command:
```bash

```

## How create and run migrations
```bash
  
``

```bash
  
```

## Running the app

First, you need create a `.env` file at the project root:

```bash
######################
######ENV VARS########
######################
JWT_SECRET=batata
```

Then, you can run as follows:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

## Swagger route is http://localhost:3000/api/v1/docs