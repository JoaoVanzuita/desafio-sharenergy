import { Module } from '@nestjs/common'

import { RandomUsersController } from './random-users.controller'
import { RandomUsersService } from './random-users.service'

@Module({
  controllers: [RandomUsersController],
  providers: [RandomUsersService]
})
export class RandomUsersModule { }