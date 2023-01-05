import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString } from 'class-validator'

export class QueryParamsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
    page: number
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
    results: number
}