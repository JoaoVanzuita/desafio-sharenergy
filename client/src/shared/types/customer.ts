export type TCustomer = {
  id?: string
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