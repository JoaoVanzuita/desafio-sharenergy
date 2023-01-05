import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { ClientDto } from './dto/request/client.dto'
import { DefaultClientsResponseDto } from './dto/response/default-clients-response.dto'
import { FindWithFiltersResponseDto } from './dto/response/find-with-filters-response.dto'
import { ClientsRepository } from './repositories/clients.repository'

@Injectable()
export class ClientsService {

  constructor(private readonly clientRepository: ClientsRepository) { }

  async create(createClientDto: ClientDto): Promise<DefaultClientsResponseDto> {

    return await this.clientRepository.create({
      id: uuid(),
      ...createClientDto
    })
  }

  async findWithFilters(name: string, page: number, results: number): Promise<FindWithFiltersResponseDto> {

    if (!name) name = ''

    return await this.clientRepository.findWithFilters(name, page, results)
  }

  async findOne(id: string): Promise<DefaultClientsResponseDto> {
    const client = await this.clientRepository.findOne({ id })

    if (!client) throw new NotFoundException('Cliente não encontrado')

    return client
  }

  async update(id: string, updateClientDto: ClientDto): Promise<DefaultClientsResponseDto> {

    return await this.clientRepository.update({ id }, updateClientDto)

  }

  async delete(id: string): Promise<DefaultClientsResponseDto> {

    return await this.clientRepository.delete({ id })
  }
}
