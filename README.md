# Express Pokémon API

## Overview
The **Express Pokémon API** is a RESTful API built using Node.js and Express that provides data about Pokémon. Users can retrieve details about different Pokémon, including their stats, abilities, and types.It has provides the ability to mark your pokemons as favourites and this is persisted in mongo db.

## Features
- Fetch details of a specific Pokémon by name or ID
- Retrieve a list of Pokémon
- Search Pokémon by type or ability
- Mark Pokémon as favorites (persisted in MongoDB)

## Tech Stack
- **Node.js**
- **Express.js**
- **Mongo DB**
- **PokéAPI**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhilasha8905/express-pokemn-api.git
   cd express-pokemn-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
## API Endpoints

### Get All Pokémon
**GET** `/pokemon`
- Retrieves a list of Pokémon.


### Add a Favorite Pokémon
**POST** `/pokemon/favorites/{id}`
- Marks a Pokémon as a favorite.
- Requires a JSON body with the Pokémon's ID or name.

### Remove a Favorite Pokémon
**DELETE** `/pokemon/favorites/{id}`
- Removes a Pokémon from the favorites list.

## API Documentation
For detailed API documentation, visit the Swagger UI:
[Express Pokémon API Docs](https://express-pokemon-api.onrender.com/api-docs/#/POKEMON/get_pokemon)

## Contribution
Feel free to fork the repo, submit issues, and contribute enhancements.


Enjoy building with the Express Pokémon API! 🚀

