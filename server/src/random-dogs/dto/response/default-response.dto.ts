import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'

export class DefaultResponseDto {

  @ApiProperty()
    mediaType: string

  @ApiResponseProperty()
    url: string
}