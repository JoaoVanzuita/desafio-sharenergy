import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, Length, Matches } from 'class-validator'

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({message: 'Nome é obrigatório'})
  @Length(3, 20, {message: 'Nome precisa ter entre 3 e 20 caracteres' })
    username: string

  @ApiProperty()
  @IsNotEmpty({message: 'Senha é obrigatória'})
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, { message: 'A senha é muito fraca' })
  @Length(8, 20, {message: 'Senha precisa ter entre 8 e 20 caracteres' })
    password: string

  @ApiProperty()
  @IsNotEmpty({message: '"Lembrar de mim" é obrigatório'})
  @IsBoolean({message: 'Valor de "lembrar de mim" inválido'})
    rememberMe: boolean
}