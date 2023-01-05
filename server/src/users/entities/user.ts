export class User {
  id: string
  username: string
  password: string

  constructor(userProps?: Partial<User>){
    this.id = userProps.id
    this.username = userProps.username
    this.password = userProps.password
  }
}