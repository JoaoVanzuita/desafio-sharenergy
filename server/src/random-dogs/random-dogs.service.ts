import { HttpException, Injectable } from '@nestjs/common'
import axios from 'axios'
import * as mime from 'mime-types'

import { DefaultRandomDogsResponseDto } from './dto/response/default-random-dogs-response.dto'

@Injectable()
export class RandomDogsService {

  private readonly api = axios.create({
    baseURL: 'https://random.dog/woof'
  })

  async getRandomDog(): Promise<DefaultRandomDogsResponseDto> {
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