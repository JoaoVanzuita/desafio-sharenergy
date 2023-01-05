import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

class Address {
  @Prop()
    city: string
  @Prop()
    street: string
  @Prop()
    number: number
}

@Schema( {collection: 'customers'} )
export class Customer {

  @Prop()
    id: string
  @Prop()
    name: string
  @Prop()
    email: string
  @Prop()
    phone: string
  @Prop()
    cpf: string
  @Prop()
    address: Address
}

export type CustomerDocument = Customer & Document

export const CustomerSchema = SchemaFactory.createForClass(Customer)