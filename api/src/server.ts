import dotenv from "dotenv"
import path from "node:path"
import { App } from "./app"
import { ErrorHandler } from "./middlewares/error-handler"
import { Routes } from "./routes"

dotenv.config({ path: path.join(__dirname, "../.env") })

async function start() {
  try {
    const routes = new Routes()
    const errorHandler = new ErrorHandler()
    const app = new App(routes.routes, errorHandler)
    const PORT = 8080
    app.listen(PORT)
  } catch (error) {
    console.log('Application start failure', error)
    process.exit(1)
  }
}

start()
