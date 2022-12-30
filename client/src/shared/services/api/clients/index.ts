import * as getAllClients from './getAllClients'
import * as createClient from './createClient'
import * as deleteClient from './deleteClient'
import * as updateClient from './updateClient'
import * as getClientById from './getClientById'

export const clientsApi = {
  ...getAllClients,
  ...createClient,
  ...deleteClient,
  ...updateClient,
  ...getClientById
}