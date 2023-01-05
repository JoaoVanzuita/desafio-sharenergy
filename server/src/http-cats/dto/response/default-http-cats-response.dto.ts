import { ApiResponseProperty } from '@nestjs/swagger'

export class DefaultHttpCatsResponseDto {

  @ApiResponseProperty()
    url: string
}