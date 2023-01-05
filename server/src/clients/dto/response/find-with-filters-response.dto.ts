import { ApiResponseProperty } from '@nestjs/swagger'

import { DefaultClientsResponseDto } from './default-clients-response.dto'

export class FindWithFiltersResponseDto {

  @ApiResponseProperty({
    type: [DefaultClientsResponseDto]
  })
  clients: DefaultClientsResponseDto[]

  @ApiResponseProperty()
  total: number
}