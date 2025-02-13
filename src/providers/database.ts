import mongoose from "mongoose";
import logger from "../utils/logger";

const MONGO_URI =
  "mongodb://admin:hIk2CebCusr3gpjG@SG-pokemons-71083.servers.mongodirector.com:27017/admin";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    logger.info(null, "MongoDB connected successfully!");
  } catch (error) {
    logger.error(null, "MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
