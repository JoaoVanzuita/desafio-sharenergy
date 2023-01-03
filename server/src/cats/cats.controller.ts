import { Controller, Get, Param } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'

import { CatsService } from './cats.service'

@Controller('http-cats')
@ApiTags('Http cats')
@ApiCookieAuth()
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Get(':statusCode')
  getHttpCat(@Param('statusCode') statusCode: string) {

    return this.catsService.getHttpCat(statusCode)
  }
}
