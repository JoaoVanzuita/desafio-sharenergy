import { Controller, Get, Param } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'

import { HttpCatsService } from './http-cats.service'

@Controller('http-cats')
@ApiTags('Http cats')
@ApiCookieAuth()
export class HttpCatsController {
  constructor(private readonly catsService: HttpCatsService) { }

  @Get(':statusCode')
  getHttpCat(@Param('statusCode') statusCode: string) {

    return this.catsService.getHttpCat(statusCode)
  }
}
