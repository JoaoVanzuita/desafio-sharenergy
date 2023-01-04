import { RandomUser } from '../models/RandomUser'
import { RawRandomUser } from '../models/RawRandomUser'

export const rawUserToUser = (rawUsers: RawRandomUser[]): RandomUser[] => {

  const randomUsers:RandomUser[] = []

  rawUsers.forEach(user => {
    randomUsers.push({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      age: user.dob.age,
      username: user.login.username,
      picture: user.picture.large
    })
  })

  return randomUsers
}