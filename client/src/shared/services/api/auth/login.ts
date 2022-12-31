import { Environment } from '../../../environment'
import { TUser } from '../../../types'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const login = async (username: string, password: string, rememberMe: boolean): Promise<TUser | ResponseError> => {

  try {
    const { data } = await Api.post('/auth/login',{
      username,
      password,
      rememberMe
    } )

    return data
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}