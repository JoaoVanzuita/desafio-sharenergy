import { Environment } from '../../../environment'
import { TRandomDogResponse } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const getRandomDog = async (): Promise<TRandomDogResponse | ResponseError> => {

  try {
    const { data } = await Api.get('/random-dogs')

    return data
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}