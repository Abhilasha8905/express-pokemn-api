import { Router, NextFunction, Request, Response } from 'express';
import IControllerBase from '../interface/IControllerBase.interface';
import PokemonService from '../services/pokemon-service';
import logger from '../utils/logger';
import { ServerResponseType } from '../utils/constants';

export default class PokemonController implements IControllerBase {
  public router = Router();
  private _pokemon_service: PokemonService;

  constructor(pokemon_service: PokemonService) {
    this.initRoutes();
    this._pokemon_service = pokemon_service;
  }

  public initRoutes(): void {
    this.router.get('/pokemon', this._listPokemons);
  }

  private _listPokemons = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const method = 'PokemonController/listPokemons';
    const operation_id = req.operation_id;
    logger.info(operation_id, `${method} - start`);

    try {
      logger.info(
        operation_id,
        `${method} - calling PokemonService/listPokemons`,
      );
      const pokemons = await this._pokemon_service.listPokemons(
        operation_id,
        req.session.user_id,
      );

      logger.info(operation_id, `${method} - end`);
      return res.status(200).send({
        status: { operation_id, message: ServerResponseType.SUCCESS },
        data: pokemons,
      });
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      next(error);
    }
  };
}
