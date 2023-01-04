import { HttpException, Injectable } from '@nestjs/common'
import axios from 'axios'

import { rawUsersToUsers } from './mappers/rawUsesrToUsers'
import { RandomUser } from './models/RandomUser'
import { RawRandomUser } from './models/RawRandomUser'

@Injectable()
export class RandomUsersService {

  api = axios.create({
    baseURL: 'https://randomuser.me/api/?seed=abc&inc=name,login,email,dob,picture&noinfo'
  })

  async getRandomUsers(page: number, results: number) {

    try {
      const { data } = await this.api.get(`&page=${page}&results=${results}`)

      const rawUsers: RawRandomUser[] = data.results

      const result: RandomUser[] = rawUsersToUsers(rawUsers)

      return result
    } catch (err) {

      throw new HttpException(err.message, err.statusCode)
    }

  }
}
