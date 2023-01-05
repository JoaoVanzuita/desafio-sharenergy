import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString } from 'class-validator'

export class QueryParamsDto {

  @ApiPropertyOptional()
    name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
    page: number
    
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
    results: number
}