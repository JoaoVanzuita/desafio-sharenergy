import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RandomDogsService } from './random-dogs.service'

@Controller('random-dogs')
@ApiTags('Random dogs')
export class RandomDogsController {
  constructor(private readonly randomDogsService: RandomDogsService) {}

  @Get()
  getRandomDog(){
    return this.randomDogsService.getRandomDog()
  }
}
