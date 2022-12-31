/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosError } from 'axios'

import { ResponseError } from '.'

export const errorInterceptor = (error: AxiosError<{ message: string[], statusCode: number }>) => {

  if (error.response!.data.message && error.response!.data.statusCode) {

    let message:string
    
    if(typeof error.response!.data.message === 'string'){
      message = error.response!.data.message
    }else{
      message = error.response!.data.message.join(', ')
    }

    throw new ResponseError(message, error.response!.data.statusCode)
  }
}