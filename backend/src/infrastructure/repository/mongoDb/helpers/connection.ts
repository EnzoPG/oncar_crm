import mongoose from "mongoose";

export default class Database {
  private _connectionString: string = process.env.MONGO_URL;

  createConnection() {
    try {
      mongoose.set("strictQuery", false).connect(this._connectionString);
      console.log("connected Database MongoDB");
    } catch (error) {
      console.log(error);
    }
  }
}
