import { Request, Response } from "express"
import { RideRepository } from "../repositories/ride.repository"
import { RideEstimateDto } from "../controllers/dto/ride-estimate.dto"
import { InvalidDataError } from "../adapters/errors/errors.adapter"
import { CustomerRepository } from "../repositories/customer.repository"
import { GoogleService } from "../services/google.service"
import { DriverRepository } from "../repositories/driver.repository"
import { EstimateResponseDto } from "../controllers/dto/estimate-response"

export class RideUseCase {
  constructor(
    private rideRepository: RideRepository,
    private driverRepository: DriverRepository,
    private customerRepository: CustomerRepository
  ) { }

  public async estimate(body: RideEstimateDto) {
    const { customerId, origin, destination } = body

    if (!customerId) {
      throw new InvalidDataError('Customer ID requerido', 'INVALID_DATA')
    }
    if (!origin) {
      throw new InvalidDataError('Origem requerido', 'INVALID_DATA')
    }
    if (!destination) {
      throw new InvalidDataError('Destino requerido', 'INVALID_DATA')
    }

    const customerExist = await this.customerRepository.findById(customerId)
    if (!customerExist) {
      throw new InvalidDataError('Cliente não encontrado', 'INVALID_DATA')
    }

    const { routes } = await GoogleService.getRoutes(origin, destination)
    const route = {
      origin: routes[0].legs[0].startLocation.latLng,
      destination: routes[0].legs[0].endLocation.latLng,
      distance: routes[0].distanceMeters,
      distanceText: routes[0].localizedValues.distance.text,
      duration: routes[0].localizedValues.duration.text,
      routeResponse: routes
    }

    const drivers = await this.driverRepository.findByDistance(
      Math.ceil(route.distance / 1000)
    )

    const response: EstimateResponseDto = {
      ...route,
      options: drivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: driver.ratings.reduce((acc, rating) => acc + rating.value, 0) / driver.ratings.length,
          comment: driver.ratings[0].description,
        },
        value: Number((driver.tax / 100) * (route.distance / 1000)),
      }))
    }

    return response
  }

  public async confirm(req: Request, res: Response) {
    res.send('Hello World!')
  }

  public async get(req: Request, res: Response) {
    res.send('Hello World!')
  }
}
