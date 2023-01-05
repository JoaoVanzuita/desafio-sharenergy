import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'

import { CreateUserDto } from './dto/request/create-user.dto'
import { DefaultUsersResponseDto } from './dto/response/default-users-response.dto'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @IsPublic()
  @ApiExtraModels(DefaultUsersResponseDto)
  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(DefaultUsersResponseDto),
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('profile')
  @ApiCookieAuth()
  @ApiExtraModels(DefaultUsersResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultUsersResponseDto),
    },
  })
  getProfile(@CurrentUser() user: User) {
    return this.usersService.getProfile(user.id)
  }
}