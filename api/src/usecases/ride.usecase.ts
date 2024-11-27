import { RideRepository } from "../repositories/ride.repository"
import { RideEstimateDto } from "../controllers/dto/ride-estimate.dto"
import {
  InvalidDataError,
  NotAcceptableError,
  NotFoundError
} from "../adapters/errors/errors.adapter"
import { CustomerRepository } from "../repositories/customer.repository"
import { GoogleService } from "../services/google.service"
import { DriverRepository } from "../repositories/driver.repository"
import { EstimateResponseDto } from "../controllers/dto/estimate-response"
import { RideConfirmDto } from "../controllers/dto/ride-confirm.dto"

export class RideUseCase {
  constructor(
    private rideRepository: RideRepository,
    private driverRepository: DriverRepository,
    private customerRepository: CustomerRepository
  ) { }

  public async estimate(body: RideEstimateDto) {
    const { customerId, origin, destination } = body

    if (!customerId || !origin || !destination || (origin === destination)) {
      throw new InvalidDataError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        'INVALID_DATA'
      )
    }

    const customerExist = await this.customerRepository.findById(customerId)
    if (!customerExist) {
      throw new NotFoundError('Cliente não encontrado', 'CUSTOMER_NOT_FOUND')
    }

    const { routes } = await GoogleService.getRoutes(origin, destination)
    const response: EstimateResponseDto = {
      origin: {
        ...routes[0].legs[0].startLocation.latLng,
        address: origin
      },
      destination: {
        ...routes[0].legs[0].endLocation.latLng,
        address: destination
      },
      distance: routes[0].distanceMeters,
      distanceText: routes[0].localizedValues.distance.text,
      duration: routes[0].localizedValues.duration.text,
      routeResponse: routes,
      options: [],
    }

    const drivers = await this.driverRepository.findByDistance(
      Math.ceil(routes[0].distanceMeters / 1000)
    )

    response.options = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.car,
      review: {
        rating: driver.ratings.reduce((acc, rating) => acc + rating.value, 0) / driver.ratings.length,
        comment: driver.ratings[0].description,
      },
      value: Number((driver.tax / 100) * (routes[0].distanceMeters / 1000)),
    }))

    return response
  }

  public async confirm(body: RideConfirmDto) {
    const {
      customerId,
      origin,
      destination,
      distance,
      duration,
      driverId,
      value
    } = body

    if (
      !customerId ||
      !driverId ||
      !origin ||
      !destination ||
      (origin === destination)
    ) {
      throw new InvalidDataError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        'INVALID_DATA'
      )
    }

    const customerExist = await this.customerRepository.findById(customerId)
    if (!customerExist) {
      throw new NotFoundError('Cliente não encontrado', 'CUSTOMER_NOT_FOUND')
    }

    const driverExist = await this.driverRepository.findById(driverId)
    if (!driverExist) {
      throw new NotFoundError('Motorista não encontrado', 'DRIVER_NOT_FOUND')
    }

    if (distance < driverExist.min_distance) {
      throw new NotAcceptableError(
        'Quilometragem inválida para o motorista',
        'INVALID_DISTANCE'
      )
    }

    await this.rideRepository.create({
      customerId,
      origin,
      destination,
      distance,
      duration,
      driverId,
      value
    })

    return { success: true }
  }

  public async get(customerId: string, driverId?: number) {
    if (!customerId) {
      throw new InvalidDataError('Customer invalido', 'INVALID_DATA')
    }

    const customerExist = await this.customerRepository.findById(customerId)
    if (!customerExist) {
      throw new NotFoundError('Cliente não encontrado', 'CUSTOMER_NOT_FOUND')
    }

    if (driverId) {
      const driverExist = await this.driverRepository.findById(driverId)
      if (!driverExist) {
        throw new InvalidDataError('Motorista invalido', 'INVALID_DRIVER')
      }
    }

    const rides = await this.rideRepository.findAllByCustomer(
      customerId,
      driverId
    )

    if (!rides?.length) {
      throw new NotFoundError('Nenhum registro encontrado', 'NO_RIDES_FOUND')
    }

    return rides
  }
}
