import { Injectable } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientsRepository } from './repositories/clients.repository'
import { v4 as uuid} from 'uuid'

@Injectable()
export class ClientsService {

  constructor(private readonly clientRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {

    return this.clientRepository.create({
      _id: uuid(),
      ...createClientDto
    })
  }

  async find() {
    return this.clientRepository.find({})
  }

  async findOne(id: string) {
    return this.clientRepository.findOne({_id: id})
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update({_id: id}, updateClientDto)
  }

  async delete(id: string) {
    return this.clientRepository.delete({_id: id})
  }
}
