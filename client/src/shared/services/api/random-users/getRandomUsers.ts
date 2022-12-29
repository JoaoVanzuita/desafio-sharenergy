import axios from 'axios'
import { TUser } from '../../../types'

export const getRandomUsers = async (page: number, limit: number): Promise<TUser[] | Error> => {

  try{
    const { data } = await axios.get(`https://randomuser.me/api/?page=${page}&results=${limit}&seed=abc&inc=name,login,email,dob,picture&noinfo`)

    return data.results
  }catch(err){

    if(err instanceof Error){
      return err
    }

    return new Error('Ocorreu um erro desconhecido')
  }
}