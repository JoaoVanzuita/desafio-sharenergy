import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import { Client, ClientDocument, } from '../schemas/client.schema'

@Injectable()
export class ClientsRepository {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }

  async findOne(filterQuery: FilterQuery<Client>): Promise<Client> {
    return this.clientModel.findOne(filterQuery)
  }

  async findWithFilters(name: string, page: number, results: number) {

    const total = (await this.clientModel.find({ name: { $regex: name } })).length

    if (total < 1) throw new NotFoundException('Nenhum cliente encontrado')

    const clients = await this.clientModel
      .find({ name: { $regex: name } })
      .limit(results)
      .skip((page - 1) * results)

    return {
      clients,
      total
    }
  }

  async create(client: Client): Promise<Client> {
    const newClient = new this.clientModel(client)

    return newClient.save()
  }

  async update(filterQuery: FilterQuery<Client>, client: Partial<Client>): Promise<Client> {
    return this.clientModel.findOneAndUpdate(filterQuery, client, {
      new: true
    })
  }

  async delete(filterQuery: FilterQuery<Client>): Promise<Client> {
    return this.clientModel.findByIdAndDelete(filterQuery)
  }
}