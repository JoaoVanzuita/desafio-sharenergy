import { Environment } from '../../../environment'
import { TCustomer } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const updateCustomer = async (client: TCustomer): Promise<TCustomer | ResponseError> => {

  try {
    const { data } = await Api.put(`customers/${client.id}`, client)

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}