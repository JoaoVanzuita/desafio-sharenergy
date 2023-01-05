import * as createCustomer from './createCustomer'
import * as deleteCustomer from './deleteCustomer'
import * as getCustomers from './getClients'
import * as getCustomerById from './getCustomerById'
import * as updateCustomer from './updateCustomer'

export const CustomersService = {
  ...getCustomers,
  ...createCustomer,
  ...deleteCustomer,
  ...updateCustomer,
  ...getCustomerById
}