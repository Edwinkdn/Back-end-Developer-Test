# Back-end-Developer-Test

# Introduction 
Basic Backend Restful API as well as swagger for RESTful api.
Tech stack includes nodejs, express framework and mongodb as a database.

## Getting Started
### Local Setup
## Test from Web Browser
1. `http://localhost:5000/swagger` for Swagger access

## Defined Environment Variables
Env variables (e.g. DB_ENDPOINT) are imported using the config files under the `config` folder. 

## Swagger Documentation
A collection of documents defined under the `docs` directory.

## Project Structure
```
/
|__ app.ts (main start)
|__ config/ (contains the config settings)
|     |__ express.config.ts (middlewares)
|__ routes (API routes)
|__ docs (OpenAPI and Swagger documentation)
|__ models (Object models)
```