import { Environment } from '../../../environment'
import { TCustomer } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const getCustomerById = async (id: string): Promise<TCustomer | ResponseError> => {

  try {
    const { data } = await Api.get(`customers/${id}`)

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}