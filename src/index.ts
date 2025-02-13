import App from "./app";

// providers
import connectDB from "./providers/database";

// middlewares
import LoggerMiddleware from "./middlewares/req-logger";
import RouteNotFoundMiddleware from "./middlewares/not-found";
import ExceptionHandlerMiddleware from "./middlewares/exception-handler";

// controllers
import HealthController from "./controllers/health-controller";
import PokemonController from "./controllers/pokemon-controller";

// servies
import PokemonService from "./services/pokemon-service";

// fatal handlers
import { handleUncaughtErrors } from "./utils/fatal";
import AuthMiddleware from "./middlewares/authentication";
import FavouriteController from "./controllers/favourite-controller";
import FavouriteService from "./services/favourite-service";
handleUncaughtErrors();

connectDB();

const app = new App({
  controllers: [
    new HealthController(),
    new PokemonController(new PokemonService()),
    new FavouriteController(new FavouriteService()),
  ],
  middleWares: [AuthMiddleware, LoggerMiddleware],
  exceptionHandlers: [RouteNotFoundMiddleware, ExceptionHandlerMiddleware],
  port: 5001,
});

app.listen();
