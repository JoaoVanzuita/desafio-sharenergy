import { ApiResponseProperty } from '@nestjs/swagger'

class AddressResponseDto {

  @ApiResponseProperty()
    city: string

  @ApiResponseProperty()
    street: string

  @ApiResponseProperty()
    number: number
}

export class DefaultCustomerResponseDto {

  @ApiResponseProperty()
    id: string

  @ApiResponseProperty()
    name: string

  @ApiResponseProperty()
    email: string

  @ApiResponseProperty()
    phone: string

  @ApiResponseProperty()
    cpf: string

  @ApiResponseProperty()
    address: AddressResponseDto
}
