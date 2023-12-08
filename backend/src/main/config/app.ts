import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import "reflect-metadata";

import routes from "@/main/routers";
import Database from "@/infrastructure/repository/mongoDb/helpers/connection";
import bodyParser from "body-parser";

class App {
  private database: Database = new Database();
  public express: express.Application;
  public constructor() {
    this.database.createConnection();
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(json());
    this.express.use(cors());
    this.routes();
  }

  public async start(port: number, callback: () => void) {
    return this.express.listen(port, callback);
  }

  private routes(): void {
    routes(this.express);
  }
}
export default new App();
