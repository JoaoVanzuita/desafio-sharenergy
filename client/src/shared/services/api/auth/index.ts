import * as findCurrentUser from './findCurrentUser'
import * as login from './login'
import * as logout from './logout'

export const AuthService = {
  ...login,
  ...logout,
  ...findCurrentUser
}