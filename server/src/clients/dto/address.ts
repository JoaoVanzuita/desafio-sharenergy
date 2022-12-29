import { ApiProperty } from '@nestjs/swagger'

export class Address {
  @ApiProperty()
    city: string
  @ApiProperty()
    street: string
  @ApiProperty()
    number: number
}