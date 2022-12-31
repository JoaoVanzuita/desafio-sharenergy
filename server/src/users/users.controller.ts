import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Usuários')
@ApiCookieAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('profile')
  findMe(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id)
  }
}