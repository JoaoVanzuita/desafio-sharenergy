import { Environment } from '../../../environment'
import { TCustomer } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const createCustomer = async (customer: TCustomer): Promise<TCustomer | ResponseError> => {

  try {
    const { data } = await Api.post('customers', customer)

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}