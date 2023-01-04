import { Client } from '../schemas/client.schema'

export class FindWithFiltersDto {
  clients: Client[]
  total: number
}