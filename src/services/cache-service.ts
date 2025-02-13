import logger from "../utils/logger";

export default class CacheService {
  private cache_map = new Map();

  set = (operation_id: string, key: string, value: string): void => {
    const method = "CacheService/set";
    logger.debug(operation_id, `${method} - start`, { key, value });

    this.cache_map.set(key, value);
    logger.info(operation_id, `${method} - end`);
  };

  get = (operation_id: string, key: string): string => {
    const method = "CacheService/get";
    logger.debug(operation_id, `${method} - start`, { key });

    const value = this.cache_map.get(key);

    logger.info(operation_id, `${method} - end`);
    return value;
  };
}
