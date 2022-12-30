export type TClient = {
  _id?: string
  name: string
  email: string
  phone: string
  cpf: string
  address: {
    city: string
    street: string
    number: number
  }
}