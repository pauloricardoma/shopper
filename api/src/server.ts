import { App } from "./app";
import { ErrorHandler } from "./middlewares/error-handler";
import { Routes } from "./routes";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function start() {
  try {
    const routes = new Routes();
    const errorHandler = new ErrorHandler();
    const app = new App(routes.routes, errorHandler);
    const PORT = 8080;
    app.listen(PORT);
  } catch (error) {
    console.log('Application start failed', error);
    process.exit(1);
  }
}

start()
