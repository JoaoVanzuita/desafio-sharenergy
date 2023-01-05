import { Controller, Get, Param } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { DefaultHttpCatsResponseDto } from './dto/response/default-http-cats-response.dto'
import { HttpCatsService } from './http-cats.service'

@Controller('http-cats')
@ApiTags('Http cats')
@ApiCookieAuth()
export class HttpCatsController {
  constructor(private readonly httpCatsService: HttpCatsService) { }

  @Get(':statusCode')
  @ApiOperation({
    summary: 'Obter url para uma imagem da api Http Cat'
  })
  @ApiExtraModels(DefaultHttpCatsResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultHttpCatsResponseDto),
    },
  })
  getHttpCat(@Param('statusCode') statusCode: string) {

    return this.httpCatsService.getHttpCat(statusCode)
  }
}
