import { Environment } from '../../../environment'
import { TClient } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

interface IGetClientsResponse {
  clients: TClient[],
  total: number
}

export const getClients = async (name: string, page:number, results:number): Promise<IGetClientsResponse | ResponseError> => {

  try {
    const { data } = await Api.get(`/clients/search?page=${page}&results=${results}&name=${name}`)

    return data
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}