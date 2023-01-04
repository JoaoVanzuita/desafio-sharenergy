import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientsRepository } from './repositories/clients.repository'

@Injectable()
export class ClientsService {

  constructor(private readonly clientRepository: ClientsRepository) { }

  async create(createClientDto: CreateClientDto) {

    return await this.clientRepository.create({
      id: uuid(),
      ...createClientDto
    })
  }

  async findWithFilters(name: string, page: number, results: number) {

    if(!name) name = ''

    return await this.clientRepository.findWithFilters(name, page, results)
  }

  async findOne(id: string) {
    return await this.clientRepository.findOne({ id })
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await this.clientRepository.update({ id }, updateClientDto)
  }

  async delete(id: string) {
    return await this.clientRepository.delete({ id })
  }
}
