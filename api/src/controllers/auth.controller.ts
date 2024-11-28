import { Request, Response } from "express"
import { CustomerRepository } from "../repositories/customer.repository"
import { ErrorHandler } from "../middlewares/error-handler"
import { AuthUseCase } from "../usecases/auth.usecase"
import { Login } from "./dto/login.dto"

export class AuthController {
  constructor() { }

  public async login(req: Request, res: Response) {
    try {
      const body = req.body as Login

      const customerRepository = new CustomerRepository()
      const rideUseCase = new AuthUseCase(customerRepository)
      const result = await rideUseCase.login(body)

      res.json(result)
    } catch (error) {
      ErrorHandler.handleError(res, error)
    }
  }
}
