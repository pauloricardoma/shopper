import { Request, Response } from "express"
import { RideUseCase } from "../usecases/ride.usecase"
import { RideRepository } from "../repositories/ride.repository"
import { CustomerRepository } from "../repositories/customer.repository"
import { RideEstimateDto } from "./dto/ride-estimate.dto"
import { ErrorHandler } from "../middlewares/error-handler"
import { DriverRepository } from "../repositories/driver.repository"

export class RideController {
  constructor() {}

  public async estimate(req: Request, res: Response) {
    console.log('##### RideController.estimate')
    try {
      const body = req.body as RideEstimateDto

      const rideRepository = new RideRepository()
      const driverRepository = new DriverRepository()
      const customerRepository = new CustomerRepository()
      const rideUseCase = new RideUseCase(
        rideRepository,
        driverRepository,
        customerRepository
      )
      const result = await rideUseCase.estimate(body)

      res.json(result)
    } catch (error) {
      console.log('##### RideController.estimate error', error)
      ErrorHandler.handleError(res, error)
    }
  }

  public async confirm(req: Request, res: Response) {
    try {

      res.json('result')
    } catch (error) {
      ErrorHandler.handleError(res, error)
    }
  }

  public async get(req: Request, res: Response) {
    try {

      res.json('result')
    } catch (error) {
      ErrorHandler.handleError(res, error)
    }
  }
}
