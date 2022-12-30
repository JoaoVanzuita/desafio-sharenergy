export type TRandomUser = {
  name: {
    first: string
    last: string
  },
  email: string
  login: {
    uuid: string
    username: string

  },
  dob: {
    age: number
  },
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
}