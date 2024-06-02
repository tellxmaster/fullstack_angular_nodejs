# SkyPulse 🌤️💨

Keeps you connected to the latest weather updates. Plan your week or step out confidently with real-time weather information at your fingertips, ensuring you're always prepared for what's ahead.

## Table of Contents

- [Utilities](#utilities)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Utilities

To use this project, you will need the following dependencies:

- [Nest](https://github.com/nestjs/nest) version 10.3.2
- [Angular](https://github.com/angular/angular) version 17.3.5
- [Docker](https://docs.docker.com/get-docker/) version 26.0.0

## Installation

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

   - Create .env File for the NestJS Server:

     ```bash
     cd server
     touch .env
     ```

     Open the .env file and add the necessary variables:

     ```
     WEATHER_API_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
     WEATHER_API_KEY={API-KEY-VISUAL-CROSSING} (Attached in the email)
     MONGODB_URI=mongodb://admin:password@localhost:27017/weather?authSource=admin
     ```

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

To rebuild the MongoDB database with Docker, ensure you have [Docker](https://docs.docker.com/get-docker/) installed and running, then create a `docker-compose.yml` file in the root of the project with the following content:

     ```bash
     docker-compose up -d
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

```

```
