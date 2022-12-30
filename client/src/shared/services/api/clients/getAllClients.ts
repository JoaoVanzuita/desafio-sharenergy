import { Environment } from '../../../environment'
import { TClient } from '../../../types'
import { Api } from '../axios-config'

export const getAllClients = async (): Promise<TClient[] | Error> => {

  try {
    const { data } = await Api.get('/clients')

    return data
  }catch(err){

    if(err instanceof Error){
      return err
    }

    return new Error(Environment.SERVER_ERROR)
  }
}