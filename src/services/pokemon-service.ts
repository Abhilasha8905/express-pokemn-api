import { POKEMON_SERVER_URL } from '../config';
import FavoriteDBEntity from '../models/db/favourite-db-entity';
import { CacheType, Pokemon, PokemonList } from '../models/pokemon';
import HttpClient from '../utils/http-client';
import logger from '../utils/logger';
import CacheService from './cache-service';

export default class PokemonService extends HttpClient {
  private cache_service: CacheService;

  constructor(cache_service: CacheService) {
    super(POKEMON_SERVER_URL);
    this.cache_service = cache_service;
  }

  listPokemons = async (
    operation_id: string,
    user_id: string,
  ): Promise<Pokemon[]> => {
    const method = 'PokemonService/listPokemons';
    logger.info(operation_id, `${method} - start`);

    try {
      logger.info(operation_id, `${method} - fetch pokemons from cache`);
      const cached_pokemons = this.cache_service.get(
        operation_id,
        CacheType.POKEMON,
      );

      logger.info(
        operation_id,
        `${method} - fetch favourite pokemons of users`,
      );
      const user_favourite_pokemons = await FavoriteDBEntity.find({
        userId: user_id,
        entityType: 'pokemon',
        isDeleted: false,
      });

      let pokemons: Pokemon[] = [];

      if (!cached_pokemons) {
        logger.info(
          operation_id,
          `${method} - cache miss, fetch pokemons from API`,
        );
        const pokemons_list: PokemonList = await this.instance.get('pokemon', {
          params: { offset: 0, limit: 150 },
        });

        logger.info(
          operation_id,
          `${method} - cache miss, fetch pokemons details from API`,
        );
        const all_pokemon_details = await Promise.allSettled(
          pokemons_list.results.map(({ name }) =>
            this.instance.get(`/pokemon/${name}`),
          ),
        );

        pokemons = all_pokemon_details
          .filter((data: any) => !!data.value)
          .map((data: any) =>
            Pokemon.parseApiDataToPokemon(operation_id, data.value),
          );

        this.cache_service.set(
          operation_id,
          CacheType.POKEMON,
          JSON.stringify(pokemons),
        );
      } else {
        pokemons = JSON.parse(cached_pokemons);
      }

      const response = pokemons.map((pokemon) => ({
        ...pokemon,
        is_favourite: user_favourite_pokemons.some(
          ({ entityId }) => pokemon.id === entityId,
        ),
      }));
      logger.info(operation_id, `${method} - end`);
      return response;
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      throw error;
    }
  };
}
