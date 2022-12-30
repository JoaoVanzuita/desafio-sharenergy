import { Environment } from '../../../environment'
import { TClient } from '../../../types'
import { Api } from '../axios-config'

export const deleteClient = async (id: string): Promise<TClient[] | Error> => {

  try {
    const { data } = await Api.delete(`/clients/${id}`)

    return data
  }catch(err){

    if(err instanceof Error){
      return err
    }

    return new Error(Environment.SERVER_ERROR)
  }
}