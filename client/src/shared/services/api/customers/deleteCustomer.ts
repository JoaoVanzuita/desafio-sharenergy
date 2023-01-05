import { Environment } from '../../../environment'
import { TCustomer } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const deleteCustomer = async (id: string): Promise<TCustomer | ResponseError> => {

  try {
    const { data } = await Api.delete(`customers/${id}`)

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}