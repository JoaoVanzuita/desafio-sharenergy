import { HttpException, Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class HttpCatsService {

  private readonly api = axios.create({
    baseURL: 'https://http.cat'
  })

  async getHttpCat(statusCode: string) {
    try {
      await this.api.get(statusCode)

      return {
        url: `https://http.cat/${statusCode}`
      }

    } catch (err) {

      throw new HttpException('Nenhum gato disponível para esse código de status', 400)
    }
  }
}