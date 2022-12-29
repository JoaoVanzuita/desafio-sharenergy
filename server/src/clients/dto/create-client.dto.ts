import { ApiProperty } from '@nestjs/swagger'
import { Address } from './address'

export class CreateClientDto {
  @ApiProperty()
    name: string
  @ApiProperty()
    email: string
  @ApiProperty()
    phone: string
  @ApiProperty()
    cpf: string
  @ApiProperty()
    address: Address
}