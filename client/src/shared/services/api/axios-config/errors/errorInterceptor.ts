/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosError } from 'axios'

import { ResponseError } from '.'

export const errorInterceptor = (error: AxiosError<{ message: string[], statusCode: number }>) => {

  if (error.response!.data.message && error.response!.data.statusCode) {
    throw new ResponseError(error.response!.data.message.join(', '), error.response!.data.statusCode)
  }
}