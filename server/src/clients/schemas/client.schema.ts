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

@Schema( {collection: 'clients'} )
export class Client {

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

export type ClientDocument = Client & Document

export const ClientSchema = SchemaFactory.createForClass(Client)