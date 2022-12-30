import { Environment } from '../../../environment'
import { TClient } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const deleteClient = async (id: string): Promise<TClient[] | ResponseError> => {

  try {
    const { data } = await Api.delete(`/clients/${id}`)

    return data
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}