import { Module } from '@nestjs/common'

import { RandomDogsController } from './random-dogs.controller'
import { RandomDogsService } from './random-dogs.service'

@Module({
  controllers: [RandomDogsController],
  providers: [RandomDogsService]
})
export class RandomDogsModule { }
