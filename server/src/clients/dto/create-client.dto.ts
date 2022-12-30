import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsPhoneNumber, Length, ValidateNested } from 'class-validator'

import { Address } from './address'

export class CreateClientDto {

  @ApiProperty()
  @IsNotEmpty({message: 'Nome é obrigatório'})
  @Length(3, 20, {message: 'Nome precisa ter entre 3 e 20 caracteres' })
    name: string
  @ApiProperty()
  @IsNotEmpty({message: 'Email é obrigatório'})
  @IsEmail({},{message: 'Email inválido'})
    email: string

  @ApiProperty()
  @IsNotEmpty({message: 'Telefone é obrigatório'})
  @IsPhoneNumber('BR', {message: 'Telefone inválido'})
    phone: string

  @ApiProperty()
  @IsNotEmpty({message: 'CPF é obrigatório'})
  @Length(11, 11, {message: 'Cpf deve ter 11 caracteres'})
  @IsNumberString({}, {message: 'Cpf inválido'})
    cpf: string

  @ApiProperty()
  @Type(() => Address)
  @ValidateNested()
  @IsNotEmptyObject({}, {message: 'Endereço é obrigatório'})
    address: Address
}