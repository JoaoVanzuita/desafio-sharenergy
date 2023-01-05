import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { Response } from 'express'

import { AuthService } from './auth.service'
import { IsPublic } from './decorators/is-public.decorator'
import { LoginDto } from './dto/request/login.dto'
import { LoginResponseDto } from './dto/response/login-response.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from './models/AuthRequest'

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Efetuar login'
  })
  @ApiExtraModels(LoginResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(LoginResponseDto),
    },
  })
  async login(@Req() req: AuthRequest, @Res() res: Response, @Body() _: LoginDto) {

    const accessToken = await this.auth.login(req.user)

    return res.cookie('access_token', accessToken, {
      maxAge: 1000 * 3600 * 12,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    }).json({
      'access_token': accessToken,
      'username': req.user.username
    })
  }

  @Post('logout')
  @ApiCookieAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Efetuar logout'
  })
  logout(@Res() res: Response) {

    return res.clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    }).send()
  }
}