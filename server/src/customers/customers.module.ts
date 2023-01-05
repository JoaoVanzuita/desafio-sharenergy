import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'
import { CustomersRepository } from './repositories/customers.repository'
import { Customer, CustomerSchema } from './schemas/cutomers.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository]
})
export class CustomersModule { }
