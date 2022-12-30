import { Environment } from '../../../environment'
import { TClient } from '../../../types'
import { Api } from '../axios-config'

export const updateClient = async (client: TClient): Promise<TClient[] | Error> => {

  try {
    const { data } = await Api.put(`clients/${client._id}`, client)

    return data
  }catch(err){

    if(err instanceof Error){
      return err
    }

    return new Error(Environment.SERVER_ERROR)
  }
}