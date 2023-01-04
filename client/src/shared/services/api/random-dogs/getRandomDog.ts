import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

interface IRandomDogResponse {
  mediaType: string
  url: string
}

export const getRandomDog = async (): Promise<IRandomDogResponse | ResponseError> => {

  try {
    const { data } = await Api.get('/random-dogs')

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}