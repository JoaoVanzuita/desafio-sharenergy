import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuid } from 'uuid'

import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'
import { CustomerDto } from './dto/request/customer.dto'
import { Customer } from './schemas/cutomers.schema'

const customersList: Customer[] = [
  {
    id: uuid(),
    name: 'customer one',
    cpf: '12345678900',
    email: 'email1@gmail.com',
    phone: '12345678900',
    address: {
      city: 'city1',
      street: 'street1',
      number: 1
    }
  },
  {
    id: uuid(),
    name: 'customer two',
    cpf: '12345678901',
    email: 'email2@gmail.com',
    phone: '12345678901',
    address: {
      city: 'city2',
      street: 'street2',
      number: 2
    }
  },
  {
    id: uuid(),
    name: 'customer three',
    cpf: '12345678903',
    email: 'email3@gmail.com',
    phone: '12345678903',
    address: {
      city: 'city3',
      street: 'street3',
      number: 3
    }
  },
]

const body: CustomerDto = {
  name: 'new customer',
  email: 'newemail@gmail.com',
  phone: '00987654321',
  cpf: '00987654321',
  address: {
    city: 'new city',
    street: 'new street',
    number: 2
  }
}

describe('CustomersController', () => {
  let customersController: CustomersController
  let customersService: CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{
        provide: CustomersService,
        useValue: {
          create: jest.fn().mockResolvedValue(customersList[1]),
          findWithFilters: jest.fn().mockResolvedValue({
            customers: customersList,
            total: customersList.length
          }),
          findOne: jest.fn().mockResolvedValue(customersList[0]),
          update: jest.fn().mockResolvedValue(customersList[1]),
          delete: jest.fn().mockResolvedValue(customersList[2])
        }
      }],
    }).compile()

    customersController = module.get<CustomersController>(CustomersController)
    customersService = module.get<CustomersService>(CustomersService)
  })

  it('should be defined', () => {
    expect(customersController).toBeDefined()
    expect(customersService).toBeDefined()
  })

  describe('findWithFilters', () => {
    const randomParams = { name: undefined, page: 0, results: 0 }

    it('should be able to return a list with 3 customers', async () => {

      const result = await customersController.findWithFilters(randomParams)

      expect(result.total).toEqual(3)
      expect(result.customers).toHaveLength(3)
      expect(customersService.findWithFilters).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(customersController, 'findWithFilters').mockRejectedValueOnce(new Error())

      expect(customersController.findWithFilters(randomParams)).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should be able to create a new customer', async () => {

      const result = await customersController.create(body)

      expect(result).toEqual(customersList[1])
      expect(customersService.create).toHaveBeenCalledWith(body)
    })

    it('should throw an exception', () => {
      jest.spyOn(customersService, 'create').mockRejectedValueOnce(new Error())

      expect(customersController.create(body)).rejects.toThrowError()
    })
  })

  describe('findOne', () => {
    it('should be able to get a customer', async () => {

      const id = uuid()

      const result = await customersController.findOne(id)

      expect(result).toEqual(customersList[0])
      expect(customersService.findOne).toHaveBeenCalledWith(id)
    })

    it('should throw an exception', () => {
      jest.spyOn(customersService, 'findOne').mockRejectedValueOnce(new Error())

      expect(customersController.findOne('id')).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should be able to update a customer', async () => {

      const id = uuid()

      const result = await customersController.update(id, body)

      expect(result).toEqual(customersList[1])
      expect(customersService.update).toBeCalledWith(id, body)
    })

    it('should throw an exception', () => {
      jest.spyOn(customersService, 'update').mockRejectedValueOnce(new Error())

      expect(customersController.update('id', body)).rejects.toThrow()
    })
  })

  describe('delete', () => {

    it('should be able to delete a customer', async () => {

      const id = uuid()

      const result = await customersController.delete(id)

      expect(result).toEqual(customersList[2])
      expect(customersService.delete).toHaveBeenCalledWith(id)
    })

    it('should throw an exception', () => {

      jest.spyOn(customersService, 'delete').mockRejectedValueOnce(new Error())

      expect(customersController.delete('id')).rejects.toThrow()
    })
  })
})