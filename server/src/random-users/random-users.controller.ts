import { Controller, Get, Query } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'

import { QueryParamsDto } from './dto/query-params.dto'
import { RandomUser } from './models/RandomUser'
import { RandomUsersService } from './random-users.service'

@Controller('random-users')
@ApiTags('Random users')
@ApiCookieAuth()
export class RandomUsersController {
  constructor(private readonly randomUsersService: RandomUsersService) { }

  @Get()
  getRandomUsers(@Query() queryParams: QueryParamsDto): Promise<RandomUser[]> {
    const { page, results } = queryParams

    return this.randomUsersService.getRandomUsers(page, results)
  }
}
