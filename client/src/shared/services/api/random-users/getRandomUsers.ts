import { Environment } from '../../../environment'
import { TRandomUser } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const getRandomUsers = async (page: number, limit: number): Promise<TRandomUser[] | ResponseError> => {

  try {
    const { data } = await Api.get(`random-users?page=${page}&results=${limit}`)

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(Environment.SERVER_ERROR, 500)
  }
}