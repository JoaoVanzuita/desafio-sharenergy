import { Module } from '@nestjs/common'

import { HttpCatsController } from './http-cats.controller'
import { HttpCatsService } from './http-cats.service'

@Module({
  controllers: [HttpCatsController],
  providers: [HttpCatsService]
})
export class HttpCatsModule { }