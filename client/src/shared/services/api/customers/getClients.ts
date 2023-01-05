import { Environment } from '../../../environment'
import { TCustomer } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

interface IGetCustomersResponse {
  customers: TCustomer[],
  total: number
}

export const getCustomers = async (name: string, page: number, results: number): Promise<IGetCustomersResponse | ResponseError> => {

  try {
    const { data } = await Api.get(`customers/search?page=${page}&results=${results}&name=${name}`)

    return data
  } catch (err) {

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}