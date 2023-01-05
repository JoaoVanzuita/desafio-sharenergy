import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import { Customer, CustomerDocument, } from '../schemas/cutomers.schema'

@Injectable()
export class CustomersRepository {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { }

  async findOne(filterQuery: FilterQuery<Customer>): Promise<Customer> {

    const result = await this.customerModel.findOne(filterQuery)

    if(!result) throw new NotFoundException('Cliente não encontrado')

    return result
  }

  async findWithFilters(name: string, page: number, results: number) {

    const total = (await this.customerModel.find({ name: { $regex: name } })).length

    if (total < 1) throw new NotFoundException('Nenhum cliente encontrado')

    const customers = await this.customerModel
      .find({ name: { $regex: name } })
      .limit(results)
      .skip((page - 1) * results)

    return {
      customers,
      total
    }
  }

  async create(customer: Customer): Promise<Customer> {
    const newClient = new this.customerModel(customer)

    return newClient.save()
  }

  async update(filterQuery: FilterQuery<Customer>, customer: Partial<Customer>): Promise<Customer> {

    const result = await this.customerModel.findOne(filterQuery)

    if(!result) throw new NotFoundException('Cliente não encontrado')

    return this.customerModel.findOneAndUpdate(filterQuery, customer, {
      new: true
    })
  }

  async delete(filterQuery: FilterQuery<Customer>): Promise<Customer> {

    const result = await this.customerModel.findOne(filterQuery)

    if(!result) throw new NotFoundException('Cliente não encontrado')

    return this.customerModel.findByIdAndDelete(filterQuery)
  }
}