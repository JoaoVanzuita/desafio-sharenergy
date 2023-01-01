import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthService } from '../services/api/auth'
import { ResponseError } from '../services/api/axios-config/errors'
import { TUser } from '../types'

export type TAuthContext = {
  isAuthenticated: boolean
  currentUser: TUser | null
  signin: (username: string, password: string) => Promise<ResponseError | void>
  signout: () => Promise<ResponseError | void>
}

export const AuthContext = createContext({} as TAuthContext)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<TUser | null>(null)

  useEffect(() => {

    AuthService.findCurrentUser().then(result => {

      if(result instanceof ResponseError) return

      setIsAuthenticated(true)
      setCurrentUser(result)
    })
  }, [])

  const signin = async (username: string, password: string) => {
    const result = await AuthService.login(username, password)

    if(result instanceof ResponseError){
      setIsAuthenticated(false)
      return result
    }

    setIsAuthenticated(true)
    setCurrentUser(result)
  }

  const signout = async () => {
    const result = await AuthService.logout()

    if(result && result.statusCode !== 401){
      setIsAuthenticated(true)
      return result
    }

    setIsAuthenticated(false)
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={ {isAuthenticated, currentUser, signin, signout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}