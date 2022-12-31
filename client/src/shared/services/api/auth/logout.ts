import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const logout = async (): Promise<void | ResponseError> => {

  try {
    await Api.post('/auth/logout')

  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}