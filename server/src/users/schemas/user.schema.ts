import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'users' })
export class User {

  @Prop()
    id: string
  @Prop({ unique: true })
    username: string
  @Prop({ select: false })
    password: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)