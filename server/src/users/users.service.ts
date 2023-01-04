import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersRepository } from './repositories/user.repository'
import { User } from './schemas/user.schema'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly usersRepository: UsersRepository) { }

  async onModuleInit() {

    const defaultUser: CreateUserDto = {
      username: process.env.DEFAULT_USER_USERNAME,
      password: process.env.DEFAULT_USER_PASSWORD
    }

    const userAlreadyExists = await this.usersRepository.findOne({ username: defaultUser.username })
    if (userAlreadyExists) return

    await this.create(defaultUser)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const userAlreadyExists = await this.usersRepository.findOne({ username: createUserDto.username })
    if (userAlreadyExists) throw new BadRequestException('Este nome de usuário já está em uso')

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
    return await this.usersRepository.findUserWithPass({ username })
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOne({ id })

    if (!user) throw new NotFoundException('Usuário não encontrado')

    return user
  }
}