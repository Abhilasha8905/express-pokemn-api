export const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Pokemon API",
  },
  basePath: "/api",
  schemes: "http",
  paths: {
    "/health": {
      get: {
        tags: ["HEALTH"],
        summary: "check health of the server",
        responses: {
          "200": {
            description: "server health",
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  description: "server status",
                },
              },
            },
          },
        },
      },
    },
    "/pokemon": {
      get: {
        tags: ["POKEMON"],
        summary: "Get list of Pokémon",
        description: "Returns a list of Pokémon",
        parameters: [
          {
            name: "offset",
            in: "query",
            description: "Number of records to skip",
            required: false,
            schema: {
              type: "integer",
              default: 0,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Maximum number of records to return",
            required: false,
            schema: {
              type: "integer",
              default: 40,
            },
          },
          {
            name: "search",
            in: "query",
            description: "search text for pokemon name",
            required: false,
            schema: {
              type: "text",
            },
          },
          {
            name: "show_favourites_only",
            in: "query",
            description: "show only favourite pokemons",
            required: false,
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of Pokémon",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/definitions/Pokemon",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/{entity_type}/favourite/{entity_id}": {
      post: {
        tags: ["FAVOURITE"],
        summary: "Add an entity to favourites",
        description:
          "This endpoint allows users to mark an entity as a favourite.",
        parameters: [
          {
            name: "entity_type",
            in: "path",
            description: "The type of entity",
            required: true,
            type: "string",
            example: "pokemon",
          },
          {
            name: "entity_id",
            in: "path",
            description: "The unique ID of the entity",
            required: true,
            type: "string",
            example: "11",
          },
        ],
        responses: {
          "200": {
            description: "Entity successfully added to favourites",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Entity added to favourites successfully",
                },
              },
            },
          },
          "400": {
            description: "Bad request (e.g., invalid entity_type or entity_id)",
          },
          "404": {
            description: "Entity not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      delete: {
        tags: ["FAVOURITE"],
        summary: "Remove an entity to favourites",
        description:
          "This endpoint allows users to unmark an entity as a favourite.",
        parameters: [
          {
            name: "entity_type",
            in: "path",
            description: "The type of entity",
            required: true,
            type: "string",
            example: "pokemon",
          },
          {
            name: "entity_id",
            in: "path",
            description: "The unique ID of the entity",
            required: true,
            type: "string",
            example: "11",
          },
        ],
        responses: {
          "200": {
            description: "Entity successfully removed to favourites",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Entity removed from favourites successfully",
                },
              },
            },
          },
          "400": {
            description: "Bad request (e.g., invalid entity_type or entity_id)",
          },
          "404": {
            description: "Entity not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
  definitions: {
    Pokemon: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name of the Pokémon",
        },
        id: {
          type: "string",
          description: "Unique identifier of the Pokémon",
        },
        front_image: {
          type: "string",
          description: "URL of the front image of the Pokémon",
        },
        back_image: {
          type: "string",
          description: "URL of the back image of the Pokémon",
        },
        weight: {
          type: "string",
          description: "Weight of the Pokémon",
        },
        height: {
          type: "string",
          description: "Height of the Pokémon",
        },
        hp: {
          type: "string",
          description: "Hit points of the Pokémon",
        },
        attack: {
          type: "string",
          description: "Attack stat of the Pokémon",
        },
        defence: {
          type: "string",
          description: "Defence stat of the Pokémon",
        },
        special_attack: {
          type: "string",
          description: "Special attack stat of the Pokémon",
        },
        special_defence: {
          type: "string",
          description: "Special defence stat of the Pokémon",
        },
        speed: {
          type: "string",
          description: "Speed stat of the Pokémon",
        },
        type: {
          type: "string",
          description: "Type of the Pokémon",
        },
      },
    },
  },
};
