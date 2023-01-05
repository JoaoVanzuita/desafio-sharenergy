import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuid } from 'uuid'

import { CustomersService } from './customers.service'
import { CustomersRepository } from './repositories/customers.repository'
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

const customer = {
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
describe('CustomersService', () => {
  let customersService: CustomersService
  let customersRepository: CustomersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CustomersRepository,
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

        }
      ]
    }).compile()

    customersService = module.get<CustomersService>(CustomersService)
    customersRepository = module.get<CustomersRepository>(CustomersRepository)
  })

  it('should be defined', () => {
    expect(customersService).toBeDefined()
    expect(customersRepository).toBeDefined()
  })

  describe('findWithFilters', () => {

    it('should be able to return a list with 3 customers', async () => {

      const result = await customersService.findWithFilters('', 0, 0)

      expect(result.customers).toHaveLength(3)
      expect(result.total).toEqual(3)
      expect(customersRepository.findWithFilters).toHaveBeenCalledWith('', 0, 0)
    })

    it('should throw a not found exception', () => {

      jest.spyOn(customersRepository, 'findWithFilters').mockRejectedValueOnce(new NotFoundException())

      expect(customersService.findWithFilters('', 0, 0)).rejects.toThrowError(NotFoundException)
    })
  })

  describe('findOne', () => {

    it('should be able to return a customer', async () => {

      const id = uuid()

      const result = await customersService.findOne(id)

      expect(result).toEqual(customersList[0])
      expect(customersRepository.findOne).toHaveBeenCalledWith({ id })
    })

    it('should throw a not found exception', () => {

      jest.spyOn(customersRepository, 'findOne').mockRejectedValueOnce(new NotFoundException())

      expect(customersService.findOne('id')).rejects.toThrowError(NotFoundException)
    })
  })

  describe('create', () => {

    it('should be able to create a customer', async () => {

      const result = await customersService.create(customer)

      expect(customersRepository.create).toBeCalledTimes(1)
      expect(result.id).toBeDefined()
    })

    it('should throw an exception', () => {

      jest.spyOn(customersRepository, 'create').mockRejectedValueOnce(new Error())

      expect(customersService.create(customer)).rejects.toThrowError()
    })
  })

  describe('update', () => {

    it('should be able to update a customer', async () => {

      const id = uuid()

      const result = await customersService.update(id, customer)

      expect(customersRepository.update).toBeCalledWith({ id }, customer)
      expect(result).toBeDefined()
    })

    it('should throw a not found exception', () => {

      jest.spyOn(customersRepository, 'update').mockRejectedValueOnce(new NotFoundException())

      expect(customersService.update('id', customer)).rejects.toThrowError(NotFoundException)
    })
  })

  describe('delete', () => {

    it('should be able to delete a customer', async () => {

      const id = uuid()

      const result = await customersService.delete(id)

      expect(customersRepository.delete).toBeCalledWith({ id })
      expect(result).toBeDefined()
    })

    it('should throw a not found exception', () => {

      jest.spyOn(customersRepository, 'delete').mockRejectedValueOnce(new NotFoundException())

      expect(customersService.delete('id')).rejects.toThrowError(NotFoundException)
    })
  })
})