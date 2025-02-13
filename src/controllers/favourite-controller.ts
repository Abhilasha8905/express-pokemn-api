import { Router, NextFunction, Request, Response } from 'express';
import IControllerBase from '../interface/IControllerBase.interface';
import FavouriteService from '../services/favourite-service';
import logger from '../utils/logger';
import { ServerResponseType } from '../utils/constants';

export default class FavouriteController implements IControllerBase {
  public router = Router();
  private _favourite_service: FavouriteService;

  constructor(favourite_service: FavouriteService) {
    this.initRoutes();
    this._favourite_service = favourite_service;
  }

  public initRoutes(): void {
    this.router.post('/:entity_type/favourite/:entity_id', this._addFavourite);
    this.router.delete(
      '/:entity_type/favourite/:entity_id',
      this._removeFavourite,
    );
  }

  private _addFavourite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const method = 'FavouriteController/addFavourite';
    const operation_id = req.operation_id;
    logger.info(operation_id, `${method} - start`);

    try {
      const { entity_type, entity_id } = req.params;
      logger.info(
        operation_id,
        `${method} - calling FavouriteService/addFavourite`,
      );
      await this._favourite_service.addFavourite(
        operation_id,
        req.session.user_id,
        { entity_type, id: entity_id },
      );

      logger.info(operation_id, `${method} - end`);
      return res.status(200).send({
        status: { operation_id, message: ServerResponseType.SUCCESS },
      });
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      next(error);
    }
  };

  private _removeFavourite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const method = 'FavouriteController/removeFavourite';
    const operation_id = req.operation_id;
    logger.info(operation_id, `${method} - start`);

    try {
      const { entity_type, entity_id } = req.params;
      logger.info(
        operation_id,
        `${method} - calling FavouriteService/removeFavourite`,
      );
      await this._favourite_service.removeFavourite(
        operation_id,
        req.session.user_id,
        { entity_type, id: entity_id },
      );

      logger.info(operation_id, `${method} - end`);
      return res.status(200).send({
        status: { operation_id, message: ServerResponseType.SUCCESS },
      });
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      next(error);
    }
  };
}
