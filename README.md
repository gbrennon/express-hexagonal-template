# Express Hexagonal Template

Welcome to the **Express Hexagonal Template**!
This template is designed to help developers build scalable, testable, and
maintainable applications using Hexagonal Architecture.

## What is Hexagonal Architecture?

Hexagonal Architecture is a software design pattern that separates the core
business logic of an application from the external interfaces that interact
with it. This separation allows developers to build applications that are
easier to test, maintain, and extend.

## How to use this template
This template provides a starting point for building applications using
Hexagonal Architecture in Node.js with Express. It includes a basic project
structure, configuration files, and example code to help you get started.

## Features
- Hexagonal Architecture: Separate your core business logic from external
  interfaces.
- Express: A fast, unopinionated, minimalist web framework for Node.js.
- TypeORM: An ORM that supports multiple databases and provides a clean
  interface for working with data.
- Docker: Containerize your application for easy deployment and scaling.
- Testing: Write unit and integration tests to ensure your application works
  as expected.
- Logging: Use Winston and Morgan to log information about your application's

## Layers

The template is organized into the following layers:
- **Application**: Orchestrates the flow of data between the core business
  logic and the external interfaces.
- **Domain**: Contains the core business logic and interfaces(ports).
- **Infrastructure**: Implements the interfaces defined in the domain layer
  and interacts with external systems.
- **Presentation**: Handles incoming requests and outgoing responses.

## Getting started

To get started, clone this repository and run `npm install`.

## Running the tests

To run the tests, run `npm test`.

## Running the server

To run the server, run `npm start`.
