import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { CustomerDto } from './dto/request/customer.dto'
import { DefaultCustomerResponseDto } from './dto/response/default-customer-response.dto'
import { FindWithFiltersResponseDto } from './dto/response/find-with-filters-response.dto'
import { CustomersRepository } from './repositories/customers.repository'

@Injectable()
export class CustomersService {

  constructor(private readonly customersRepository: CustomersRepository) { }

  async create(createCustomerDto: CustomerDto): Promise<DefaultCustomerResponseDto> {

    return await this.customersRepository.create({
      id: uuid(),
      ...createCustomerDto
    })
  }

  async findWithFilters(name: string, page: number, results: number): Promise<FindWithFiltersResponseDto> {

    if (!name) name = ''

    return await this.customersRepository.findWithFilters(name, page, results)
  }

  async findOne(id: string): Promise<DefaultCustomerResponseDto> {
    const client = await this.customersRepository.findOne({ id })

    if (!client) throw new NotFoundException('Cliente não encontrado')

    return client
  }

  async update(id: string, updateCustomerDto: CustomerDto): Promise<DefaultCustomerResponseDto> {

    return await this.customersRepository.update({ id }, updateCustomerDto)

  }

  async delete(id: string): Promise<DefaultCustomerResponseDto> {

    return await this.customersRepository.delete({ id })
  }
}
