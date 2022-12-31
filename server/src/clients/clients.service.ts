import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientsRepository } from './repositories/clients.repository'

@Injectable()
export class ClientsService {

  constructor(private readonly clientRepository: ClientsRepository) { }

  async create(createClientDto: CreateClientDto) {

    return this.clientRepository.create({
      id: uuid(),
      ...createClientDto
    })
  }

  async find() {
    return this.clientRepository.find({})
  }

  async findOne(id: string) {
    return this.clientRepository.findOne({ id })
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update({ id }, updateClientDto)
  }

  async delete(id: string) {
    return this.clientRepository.delete({ id })
  }
}
