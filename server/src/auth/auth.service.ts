import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/schemas/user.schema'
import { UsersService } from 'src/users/users.service'

import { UserPayload } from './models/UserPayload'

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(user: User, rememberMe: boolean): Promise<string> {
    const payLoad: UserPayload = {
      sub: user.id,
      username: user.username
    }

    let expirationTime: string
    if(rememberMe){
      expirationTime = '7d'
    }else{
      expirationTime = '8h'
    }

    const token = this.jwtService.sign(payLoad, {
      expiresIn: expirationTime
    })

    return token
  }

  async validateUser(username: string, password: string): Promise<User> {

    const user: User = await this.usersService.findUserWithPass(username)

    if (user) {
      const isPassValid = await bcrypt.compare(password, user.password)

      console.log(isPassValid)

      if (isPassValid) {
        return {
          id: user.id,
          username: user.username,
          password: undefined
        }
      }
    }
    throw new Error('Nome de usuário ou senha inválidos')
  }
}