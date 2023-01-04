import { Environment } from '../../../environment'
import { Api } from '../axios-config'
import { ResponseError } from '../axios-config/errors'

export const getHttpCat = async (statusCode: string): Promise<string | ResponseError> => {

  try {
    const { data } = await Api.get(`/http-cats/${statusCode}`)

    return data.url
  }catch(err){

    if (err instanceof ResponseError) {
      return err
    }

    return new ResponseError(`${Environment.SERVER_ERROR}`, 500)
  }
}