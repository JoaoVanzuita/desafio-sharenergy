import { HttpException, Injectable } from '@nestjs/common'
import axios from 'axios'

import { DefaultRandomUsersResponseDto } from './dto/response/default-random-users-response.dto'
import { rawUsersToUsers } from './mappers/rawUsesrToUsers'
import { RandomUser } from './models/RandomUser'
import { RawRandomUser } from './models/RawRandomUser'

@Injectable()
export class RandomUsersService {

  api = axios.create({
    baseURL: 'https://randomuser.me/api/?seed=abc&inc=name,login,email,dob,picture&noinfo'
  })

  async getRandomUsers(page: number, results: number): Promise<DefaultRandomUsersResponseDto> {

    try {
      const { data } = await this.api.get(`&page=${page}&results=${results}`)

      const rawUsers: RawRandomUser[] = data.results

      const users: RandomUser[] = rawUsersToUsers(rawUsers)

      return {
        users
      }
    } catch (err) {

      throw new HttpException(err.message, err.statusCode)
    }

  }
}
