import { Controller, Get, Query } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { QueryParamsDto } from './dto/request/query-params.dto'
import { DefaultRandomUsersResponseDto } from './dto/response/default-random-users-response.dto'
import { RandomUsersService } from './random-users.service'

@Controller('random-users')
@ApiTags('Random users')
@ApiCookieAuth()
export class RandomUsersController {
  constructor(private readonly randomUsersService: RandomUsersService) { }

  @Get()
  @ApiOperation({
    summary: 'Obter lista de usuários da api Random User Generator'
  })
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
