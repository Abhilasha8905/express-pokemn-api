import FavoriteDBEntity from "../models/db/favourite-db-entity";
import { ListPokemonQuery, Pokemon, PokemonList } from "../models/pokemon";
import HttpClient from "../utils/http-client";
import logger from "../utils/logger";

export default class PokemonService extends HttpClient {
  constructor() {
    super("https://pokeapi.co/api/v2");
  }

  listPokemons = async (
    operation_id: string,
    user_id: string,
    query: ListPokemonQuery
  ): Promise<Pokemon[]> => {
    const method = "PokemonService/listPokemons";
    logger.debug(operation_id, `${method} - start`, query);

    try {
      const { offset, limit, search, show_favourites_only } = query;

      logger.info(
        operation_id,
        `${method} - calling API to fetch pokemons list`
      );
      const data: PokemonList = await this.instance.get("pokemon", {
        params: { offset: 0, limit: 150 },
      });

      const filtered_pokemons = data.results
        .map(({ name }) => name)
        .filter(
          (name) => !search?.length || name.toLowerCase?.()?.startsWith(search)
        );

      logger.info(
        operation_id,
        `${method} - calling API to fetch pokemons details & favourites pokemons`
      );
      const all_promise_results = await Promise.allSettled([
        ...filtered_pokemons.map((name) =>
          this.instance.get(`/pokemon/${name}`)
        ),
        FavoriteDBEntity.find({
          userId: user_id,
          entityType: "pokemon",
          isDeleted: false,
        }),
      ]);

      const user_favourites = all_promise_results.pop(); // last api

      let result_pokemons = all_promise_results
        .filter((data: any) => !!data.value)
        .map((data: any) =>
          Pokemon.parseApiDataToPokemon(
            operation_id,
            data.value,
            user_favourites
          )
        );

      if (show_favourites_only) {
        result_pokemons = result_pokemons.filter(
          (pokemon) => pokemon.is_favourite
        );
      }

      logger.info(operation_id, `${method} - end`);
      return result_pokemons.slice(offset, offset + limit);
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      throw error;
    }
  };
}
