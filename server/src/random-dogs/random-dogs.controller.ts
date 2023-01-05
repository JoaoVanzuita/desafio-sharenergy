import { Controller, Get } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { DefaultRandomDogsResponseDto } from './dto/response/default-random-dogs-response.dto'
import { RandomDogsService } from './random-dogs.service'

@Controller('random-dogs')
@ApiTags('Random dogs')
@ApiCookieAuth()
export class RandomDogsController {
  constructor(private readonly randomDogsService: RandomDogsService) { }

  @Get()
  @ApiOperation({
    summary: 'Obter url e tipo para uma mídia da api Random Dogs'
  })
  @ApiExtraModels(DefaultRandomDogsResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultRandomDogsResponseDto),
    },
  })
  getRandomDog() {
    return this.randomDogsService.getRandomDog()
  }
}
