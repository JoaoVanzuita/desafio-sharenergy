import { ApiResponseProperty } from '@nestjs/swagger'

export class DefaultUsersResponseDto {

  @ApiResponseProperty()
    id: string

  @ApiResponseProperty()
    username: string
}