import App from './app';
import { PORT } from './config';

// providers
import connectToDatabase from './providers/database';

// middlewares
import AuthMiddleware from './middlewares/authentication';
import LoggerMiddleware from './middlewares/req-logger';
import RouteNotFoundMiddleware from './middlewares/not-found';
import ExceptionHandlerMiddleware from './middlewares/exception-handler';

// controllers
import HealthController from './controllers/health-controller';
import PokemonController from './controllers/pokemon-controller';
import FavouriteController from './controllers/favourite-controller';

// servies
import PokemonService from './services/pokemon-service';
import FavouriteService from './services/favourite-service';
import CacheService from './services/cache-service';

// fatal handlers
import { handleUncaughtErrors } from './utils/fatal';
handleUncaughtErrors();

connectToDatabase();

const app = new App({
  controllers: [
    new HealthController(),
    new PokemonController(new PokemonService(new CacheService())),
    new FavouriteController(new FavouriteService()),
  ],
  middleWares: [AuthMiddleware, LoggerMiddleware],
  exceptionHandlers: [RouteNotFoundMiddleware, ExceptionHandlerMiddleware],
  port: Number(PORT),
});

app.listen();
