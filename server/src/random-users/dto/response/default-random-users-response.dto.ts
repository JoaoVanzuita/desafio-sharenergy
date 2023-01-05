import { ApiProperty } from '@nestjs/swagger'

class RandomUser {

  @ApiProperty()
    id: string

  @ApiProperty()
    name: string

  @ApiProperty()
    email: string

  @ApiProperty()
    age: number

  @ApiProperty()
    username: string

  @ApiProperty()
    picture: string

}

export class DefaultRandomUsersResponseDto {

  @ApiProperty({
    type: [RandomUser]
  })
    users: RandomUser[]
}