import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDto {
  @ApiProperty()
    username: string

  @ApiProperty()
    access_token: string
}