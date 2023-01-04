import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import { User, UserDocument } from '../schemas/user.schema'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(filterQuery)
  }

  async findUserWithPass(filterQuery: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(filterQuery).select('+password')
  }

  async create(User: User): Promise<User> {
    const newUser = new this.userModel(User)

    return await newUser.save()
  }
}