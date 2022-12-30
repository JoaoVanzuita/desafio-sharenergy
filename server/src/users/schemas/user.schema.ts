import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema( {collection: 'users'} )
export class User {

  @Prop()
    _id: string
  @Prop()
    username: string
  @Prop()
    password: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)