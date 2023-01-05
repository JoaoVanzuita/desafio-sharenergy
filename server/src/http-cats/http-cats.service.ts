import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'

import { DefaultHttpCatsResponseDto } from './dto/response/default-http-cats-response.dto'

@Injectable()
export class HttpCatsService {

  private readonly api = axios.create({
    baseURL: 'https://http.cat'
  })

  async getHttpCat(statusCode: string): Promise<DefaultHttpCatsResponseDto> {
    try {
      await this.api.get(statusCode)

      return {
        url: `https://http.cat/${statusCode}`
      }

    } catch (err) {

      throw new BadRequestException('Nenhum gato disponível para esse código de status')
    }
  }
}