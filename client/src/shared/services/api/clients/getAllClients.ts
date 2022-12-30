import { Environment } from '../../../environment'
import { TClient } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const getAllClients = async (): Promise<TClient[] | ResponseError> => {

  try {
    const { data } = await Api.get('/clients')

    return data
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}