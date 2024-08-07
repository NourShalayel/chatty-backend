import express, { Express } from "express";
import { ChattyServer } from "./setupServer";
import databaseConnection from "./setupDatabase";
import { config } from "./config";
class Application {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();
    databaseConnection();
    const server: ChattyServer = new ChattyServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
