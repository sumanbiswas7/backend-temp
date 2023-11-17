# Backend Using JavaScript + Express

This repository contains the backend code for a web application built with JavaScript and Express. It provides a simple server setup to handle HTTP requests and interact with a MongoDB database using Mongoose.

## Scripts

#### Start Server in Dev mode

To start the server in dev mode and watch for changes, run the following command:

```bash
yarn run dev
```

#### Start Server

To start the server, run the following command:

```bash
yarn start

```

## Project Structure

The project follows a modular structure for better organization and maintainability:

- **src/routes**: This directory contains different route files, each handling specific API endpoints. Separating routes helps keep the codebase organized and makes it easier to manage different parts of the application.

- **src/models**: In this directory, you'll find the Mongoose models for interacting with the MongoDB database. Each model represents a data entity and defines its schema and behavior.

- **src/utils**: Utilities and helper functions are stored in this directory. These functions are commonly used across different parts of the application, promoting code reuse and maintainability.

- **src/controllers**: The controllers directory houses the main functions that handle the business logic for each route. Separating controllers from routes allows for cleaner, more modular code. Controllers are responsible for processing requests, interacting with models, and returning appropriate responses.

This project structure enhances code organization and readability, making it easier for developers to collaborate and maintain the codebase over time.

## Author

[Suman Biswas](https://sumanbiswas.vercel.app)
