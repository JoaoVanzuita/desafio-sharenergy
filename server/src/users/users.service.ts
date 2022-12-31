import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersRepository } from './repositories/user.repository'
import { User } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10)

    const createdUser = await this.usersRepository.create({
      id: uuid(),
      username: createUserDto.username,
      password: passwordHash
    })

    return {
      id: createdUser.id,
      username: createdUser.username,
      password: undefined
    }
  }

  async findUserWithPass(username: string): Promise<User> {
    return this.usersRepository.findUserWithPass({ username })
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({ id })
  }
}