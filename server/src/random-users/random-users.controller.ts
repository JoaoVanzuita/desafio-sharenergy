import { Controller, Get, Query } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { QueryParamsDto } from './dto/request/query-params.dto'
import { DefaultRandomUsersResponseDto } from './dto/response/default-random-users-response.dto'
import { RandomUsersService } from './random-users.service'

@Controller('random-users')
@ApiTags('Random users')
@ApiCookieAuth()
export class RandomUsersController {
  constructor(private readonly randomUsersService: RandomUsersService) { }

  @Get()
  @ApiExtraModels(DefaultRandomUsersResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultRandomUsersResponseDto),
    },
  })
  getRandomUsers(@Query() queryParams: QueryParamsDto) {
    const { page, results } = queryParams

    return this.randomUsersService.getRandomUsers(page, results)
  }
}
