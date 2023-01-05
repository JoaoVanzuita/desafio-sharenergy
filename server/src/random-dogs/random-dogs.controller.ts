import { Controller, Get } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { DefaultResponseDto } from './dto/response/default-response.dto'
import { RandomDogsService } from './random-dogs.service'

@Controller('random-dogs')
@ApiTags('Random dogs')
@ApiCookieAuth()
export class RandomDogsController {
  constructor(private readonly randomDogsService: RandomDogsService) {}

  @Get()
  @ApiExtraModels(DefaultResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultResponseDto),
    },
  })
  getRandomDog(){
    return this.randomDogsService.getRandomDog()
  }
}
