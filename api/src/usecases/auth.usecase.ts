import { InvalidDataError } from "../adapters/errors/errors.adapter"
import { CustomerRepository } from "../repositories/customer.repository"
import { Login } from "../controllers/dto/login.dto"

export class AuthUseCase {
  constructor(private customerRepository: CustomerRepository) { }

  public async login(body: Login) {
    const { name } = body

    if (!name) {
      throw new InvalidDataError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        'INVALID_DATA'
      )
    }

    const customerExist = await this.customerRepository.findByName(name)

    if (customerExist) {
      return customerExist
    }

    const newCustomer = await this.customerRepository.create(name)

    return newCustomer
  }
}
