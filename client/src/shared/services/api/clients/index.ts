import * as createClient from './createClient'
import * as deleteClient from './deleteClient'
import * as getClientById from './getClientById'
import * as getClients from './getClients'
import * as updateClient from './updateClient'

export const ClientsService = {
  ...getClients,
  ...createClient,
  ...deleteClient,
  ...updateClient,
  ...getClientById
}