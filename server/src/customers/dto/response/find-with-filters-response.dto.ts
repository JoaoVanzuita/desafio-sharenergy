import { ApiResponseProperty } from '@nestjs/swagger'

import { DefaultCustomerResponseDto } from './default-customer-response.dto'

export class FindWithFiltersResponseDto {

  @ApiResponseProperty({
    type: [DefaultCustomerResponseDto]
  })
    customers: DefaultCustomerResponseDto[]

  @ApiResponseProperty()
    total: number
}