import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, Length, Min } from 'class-validator'

export class Address {
  @ApiProperty()
  @IsNotEmpty({message: 'Nome da cidade é obrigatório'})
  @Length(3, 20, {message: 'Nome da cidade deve ter entre 3 e 20 caracteres'})
    city: string
  @ApiProperty()
  @IsNotEmpty({message: 'Nome da rua é obrigatório'})
  @Length(3, 20, {message: 'Nome da rua deve ter entre 3 e 20 caracteres'})
    street: string
  @ApiProperty()
  @IsNotEmpty({message: 'Número é obrigatório'})
  @IsNumber({}, {message: 'Número inválido'})
  @Min(1, {message: 'Número inválido'})
    number: number
}