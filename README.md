# Express Pokémon API

## Overview
The **Express Pokémon API** is a RESTful API built using Node.js and Express that provides data about Pokémon. Users can retrieve details about different Pokémon, including their stats, abilities, and types.

## Features
- Fetch details of a specific Pokémon by name or ID
- Retrieve a list of Pokémon
- Search Pokémon by type or ability
- Mark Pokémon as favorites

## Tech Stack
- **Node.js**
- **Express.js**
- **PokéAPI** (optional, for fetching Pokémon data)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhilasha8905/express-pokemon-api.git
   cd express-pokemon-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Get All Pokémon
**GET** `/pokemon`
- Retrieves a list of Pokémon.


### Add a Favorite Pokémon
**POST** `/favorites/{id}`
- Marks a Pokémon as a favorite.
- Requires a JSON body with the Pokémon's ID or name.

### Remove a Favorite Pokémon
**DELETE** `/favorites/{id}`
- Removes a Pokémon from the favorites list.

## API Documentation
For detailed API documentation, visit the Swagger UI:
[Express Pokémon API Docs](https://express-pokemon-api.onrender.com/api-docs/#/POKEMON/get_pokemon)

## Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=3000
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## Contribution
Feel free to fork the repo, submit issues, and contribute enhancements.


Enjoy building with the Express Pokémon API! 🚀

