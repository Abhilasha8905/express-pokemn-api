// basic Error / Exception handler

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Intercepts the exceptions and logs them if required
 * @param err
 * @param req
 * @param res
 * @param next
 */
const ExceptionHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const status = err.status || (err.response && err.response.status) || 500;
  const requestUrl = req.originalUrl;
  const message =
    (err.response && err.response.data && err.response.data.message) ||
    err.message ||
    'something went wrong';

  // log error
  logger.error(
    null,
    `Error - ${JSON.stringify({
      status,
      message,
      requestUrl,
    })}`,
  );
  return res.status(status).json({ status, message, requestUrl });
};

export default ExceptionHandlerMiddleware;