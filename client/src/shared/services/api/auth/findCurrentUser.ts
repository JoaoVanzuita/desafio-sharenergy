import { Environment } from '../../../environment'
import { TUser } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const findCurrentUser = async (): Promise<TUser | ResponseError> => {

  try {
    const { data } = await Api.get('/users/profile')

    return data
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}