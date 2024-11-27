import express, { Express, Router } from 'express'
import cors from 'cors'
import { ErrorHandler } from './middlewares/error-handler'

export class App {
  public express: Express

  constructor(routes: Router, errorHandler: ErrorHandler) {
    this.express = express()
    this.startMiddlewares(routes, errorHandler)
  }

  private startMiddlewares(routes: Router, errorHandler: ErrorHandler) {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(routes)
    this.express.use(errorHandler.handle)
  }

  public listen(port: number) {
    this.express.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}
