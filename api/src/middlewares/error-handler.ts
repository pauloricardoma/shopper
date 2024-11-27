import { NextFunction, Request, Response } from "express"
import { CustomAPIError } from "../adapters/errors/errors.adapter"

export class ErrorHandler {
  public async handle(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    console.log('ErrorHandler: ', error)
    response.sendStatus(500)
    next()
  }

  public static handleError(res: Response, error: unknown) {
    if (error instanceof CustomAPIError) {
      res.status(error.statusCode || 500).json({
        error_code: error.error_code,
        error_description: error.error_description,
      })
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
