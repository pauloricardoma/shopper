import { Request, Response } from "express"
import { RideUseCase } from "../usecases/ride.usecase"
import { RideRepository } from "../repositories/ride.repository"
import { CustomerRepository } from "../repositories/customer.repository"
import { RideEstimateDto } from "./dto/ride-estimate.dto"
import { ErrorHandler } from "../middlewares/error-handler"
import { DriverRepository } from "../repositories/driver.repository"
import { RideConfirmDto } from "./dto/ride-confirm.dto"

export class RideController {
  constructor() { }

  public async estimate(req: Request, res: Response) {
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
      ErrorHandler.handleError(res, error)
    }
  }

  public async confirm(req: Request, res: Response) {
    try {
      const body = req.body as RideConfirmDto

      const rideRepository = new RideRepository()
      const driverRepository = new DriverRepository()
      const customerRepository = new CustomerRepository()
      const rideUseCase = new RideUseCase(
        rideRepository,
        driverRepository,
        customerRepository
      )
      const result = await rideUseCase.confirm(body)

      res.json(result)
    } catch (error) {
      ErrorHandler.handleError(res, error)
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { customer_id } = req.params
      const { driver_id } = req.query as { driver_id?: string }
      const driverId = driver_id ? parseInt(driver_id) : undefined

      const rideRepository = new RideRepository()
      const driverRepository = new DriverRepository()
      const customerRepository = new CustomerRepository()
      const rideUseCase = new RideUseCase(
        rideRepository,
        driverRepository,
        customerRepository
      )
      const result = await rideUseCase.get(customer_id, driverId)

      res.json(result)
    } catch (error) {
      ErrorHandler.handleError(res, error)
    }
  }
}
