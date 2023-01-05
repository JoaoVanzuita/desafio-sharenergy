import { HttpException, Injectable } from '@nestjs/common'
import axios from 'axios'
import * as mime from 'mime-types'

import { DefaultResponseDto } from './dto/response/default-response.dto'

@Injectable()
export class RandomDogsService {

  private readonly api = axios.create({
    baseURL: 'https://random.dog/woof'
  })

  async getRandomDog(): Promise<DefaultResponseDto> {
    try {
      const { data } = await this.api.get('')

      return {
        mediaType: mime.lookup(data).toString(),
        url: `https://random.dog/${data}`
      }

    } catch (err) {
      throw new HttpException(err.message, err.statusCode)
    }
  }
}