import { HttpException, Injectable } from '@nestjs/common'
import axios from 'axios'
import * as mime from 'mime-types'

@Injectable()
export class RandomDogsService {

  private readonly api = axios.create({
    baseURL: 'https://random.dog/woof'
  })

  async getRandomDog(){
    try{
      const { data } = await this.api.get('')

      return {
        mediaType: mime.lookup(data),
        url: `https://random.dog/${data}`
      }

    }catch(err){
      throw new HttpException(err.message, err.statusCode)
    }
  }
}