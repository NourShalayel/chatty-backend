import mongoose from "mongoose";
import { config } from "./config";
import Logger from "bunyan";

const log: Logger = config.createLogger("setupDatabase");

export default () => {
  const connect = () => {
    mongoose
      .connect("mongodb://localhost:27017/chattyapp-backend")
      .then(() => {
        log.info("Successfully connected to database.");
      })
      .catch((error) => {
        log.error("Error Connecting to database", error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};
