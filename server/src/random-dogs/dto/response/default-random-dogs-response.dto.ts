import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'

export class DefaultRandomDogsResponseDto {

  @ApiProperty()
    mediaType: string

  @ApiResponseProperty()
    url: string
}