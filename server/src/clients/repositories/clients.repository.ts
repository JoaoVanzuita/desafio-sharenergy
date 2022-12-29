import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { Client, ClientDocument, } from '../schemas/client.schema'

@Injectable()
export class ClientsRepository {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }

  async findOne(filterQuery: FilterQuery<Client>): Promise<Client> {
    return this.clientModel.findOne(filterQuery)
  }

  async find(filterQuery: FilterQuery<Client>): Promise<Client[]> {
    return this.clientModel.find(filterQuery)
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

  async delete(filterQuery: FilterQuery<Client>) {
    this.clientModel.deleteOne(filterQuery)
  }
}