# SkyPulse 🌤️💨

Keeps you connected to the latest weather updates. Plan your week or step out confidently with real-time weather information at your fingertips, ensuring you're always prepared for what's ahead.

## Table of Contents

- [Utilities](#utilities)
- [Installation](#installation)
- [Usage](#usage)

## Utilities

To use this project, you will need the following dependencies:

- [Nest](https://github.com/nestjs/nest) version 10.3.2
- [Angular](https://github.com/angular/angular) version 17.3.5
- [Docker](https://docs.docker.com/get-docker/) version 26.0.0
- [MongoDBCompass](https://www.mongodb.com/products/tools/compass) version 1.43.0
- [VisualCrossing Weather API](https://www.visualcrossing.com/weather-api)

## Installation

### Via Docker

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

First replace the API_KEY sent in the mail in the `docker-compose.yml` file:

```docker
 environment:
      WEATHER_API_URL: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
      WEATHER_API_KEY: { API-KEY }
      MONGODB_URI: mongodb://admin:password@mongodb:27017/weather?authSource=admin
```

> **Note:** 📧 The API key is sent to you via email. Please check your email for the API key. 📧

Then run the command to build image:

```sh
docker-compose up --build
```

Once the image is built, you can access both the backend of the application at [http://localhost:80](http://localhost:80) and the back at [http://localhost:3000](http://localhost:3000).

### Manual

1. Clone the Repository

   First, clone the repository using the following command in your terminal:

   ```bash
   git clone https://github.com/tellxmaster/fullstack_angular_nodejs.git
   ```

   Navigate to the project folder:

   ```bash
   cd fullstack_angular_nodejs
   ```

2. Environment Setup

   Before starting the services, you need to set up the necessary environment variables for both the server and the Angular application.

- Change to server directory

  ```bash
  cd server
  ```

- Create .env File for the NestJS Server:

  ### Linux

  ```bash
  touch .env
  ```

  ### Windows

  ```powershell
  type nul > .env
  ```

  Open the .env file and add the necessary variables:

  ```env
  WEATHER_API_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
  WEATHER_API_KEY={API-KEY}
  MONGODB_URI=mongodb://admin:password@localhost:27017/weather?authSource=admin
  ```

  > **Note:** 📧 The API key is sent to you via email. Please check your email for the API key. 📧

  Save and close the file.

  - (Optional) Configure Environment Variables for Angular:

    If Angular requires environment variables during build time, follow these steps:

    Return to the main directory and navigate to the Angular directory:

    ```bash
    cd ../app
    ```

    Within this directory, locate or create an environment configuration file, typically found in `src/environments/environment.prod.ts` for production or `src/environments/environment.ts` for development.

    Add the necessary variables, for example:

    ```ts
    export const environment = {
      production: false,
      apiUrl: "http://localhost:3000",
    };
    ```

    Save and close the file.

3. Install Dependencies

   - Install Angular Dependencies from the `app` directory:

     ```bash
     npm install
     ```

   - Install NestJS Dependencies, return to the `server` directory and run:

     ```bash
     npm install
     ```

## Docker Configuration for MongoDB Database

To rebuild the MongoDB database with Docker, ensure you have [Docker](https://docs.docker.com/get-docker/) installed and running, then replace the content of `docker-compose.yml` file in the root of the project with the following content:

```docker
version: "4.4"

services:
  mongodb:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    ports:
      - 27017:27017
    volumes:
      - mongodb_data:/data/db
      - ./init-mongo:/docker-entrypoint-initdb.d

volumes:
  mongodb_data:
    driver: local
```

Execute the command in the root folder of the `fullstack_angular_nodejs/project`

```sh
docker-compose up -d
```

Test Mongo connection with Compass or mongosh with this conection string

```sh
mongodb://admin:password@localhost:27017/?authSource=admin
```

# Usage

### Start the NestJS Server

From the server directory, start the server using:

```sh
npm run start
```

### Start the Angular Application

Open another terminal, navigate to the app directory and execute:

```sh
ng serve
```

Once both servers are running and the database is set up, you can access the Angular application through a web browser at [http://localhost:4200](http://localhost:4200).
