import FavoriteDBEntity from "../models/db/favourite-db-entity";
import FavouriteEntity from "../models/favourite-entity";
import logger from "../utils/logger";

export default class FavouriteService {
  addFavourite = async (
    operation_id: string,
    user_id: string,
    entity: FavouriteEntity
  ): Promise<void> => {
    const method = "FavouriteService/addFavourite";
    logger.debug(operation_id, `${method} - start`, { user_id, entity });

    try {
      const exists = await FavoriteDBEntity.findOne({
        entityType: entity.entity_type,
        userId: user_id,
        pokemonId: entity.id,
        isDeleted: false,
      });
      if (exists) {
        logger.error(operation_id, `${method} - already marked favourite`);
        return;
      }

      await new FavoriteDBEntity({
        entityType: entity.entity_type,
        userId: user_id,
        entityId: entity.id,
      }).save();

      logger.info(operation_id, `${method} - end`);
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      throw error;
    }
  };

  removeFavourite = async (
    operation_id: string,
    user_id: string,
    entity: FavouriteEntity
  ): Promise<void> => {
    const method = "FavouriteService/removeFavourite";
    logger.debug(operation_id, `${method} - start`, entity);

    try {
      const exists = await FavoriteDBEntity.findOne({
        entityType: entity.entity_type,
        userId: user_id,
        entityId: entity.id,
        isDeleted: false,
      });

      if (!exists) {
        logger.error(operation_id, `${method} - favourite doesn't exist`);
        return;
      }

      await FavoriteDBEntity.updateOne(
        {
          entityType: entity.entity_type,
          userId: user_id,
          entityId: String(entity.id),
        },
        { isDeleted: true, deletedAt: new Date() }
      );
      logger.info(operation_id, `${method} - end`);
    } catch (error) {
      logger.error(operation_id, `${method} - error`, error);
      throw error;
    }
  };
}
