import * as createClient from './createClient'
import * as deleteClient from './deleteClient'
import * as getAllClients from './getAllClients'
import * as getClientById from './getClientById'
import * as updateClient from './updateClient'

export const ClientsService = {
  ...getAllClients,
  ...createClient,
  ...deleteClient,
  ...updateClient,
  ...getClientById
}