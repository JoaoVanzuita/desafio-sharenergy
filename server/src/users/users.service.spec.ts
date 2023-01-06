import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuid } from 'uuid'

import { CreateUserDto } from './dto/request/create-user.dto'
import { UsersRepository } from './repositories/user.repository'
import { UsersService } from './users.service'

const userCreate: CreateUserDto = {
  username: process.env.DEFAULT_USER_USERNAME,
  password: process.env.DEFAULT_USER_PASSWORD
}

const user = {
  id: uuid(),
  ...userCreate
}

const profile = {
  id: uuid(),
  username: process.env.DEFAULT_USER_USERNAME
}

describe('UsersService', () => {
  let usersService: UsersService
  let usersRepository: UsersRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(profile),
            create: jest.fn().mockResolvedValue(user),
            getProfile: jest.fn().mockResolvedValue(profile),
            findUserWithPass: jest.fn().mockResolvedValue(user)
          }
        }],
    }).compile()

    usersService = module.get<UsersService>(UsersService)
    usersRepository = module.get<UsersRepository>(UsersRepository)
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
    expect(usersRepository).toBeDefined()
  })

  describe('create', () => {

    it('should be able to create a new user', async () => {

      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null)

      const result = await usersService.create({
        username: 'new user',
        password: 'newpass@12'
      })

      expect(result.id).toBeDefined()
      expect(result.username).toEqual(userCreate.username)
      expect(result.password).toBeUndefined()
    })

    it('should not be able to create an user that already exists', async () => {

      expect(usersService.create(userCreate)).rejects.toThrowError(BadRequestException)
    })
  })

  describe('findUserWithPass', () => {

    it('should be able to return a user with password', async () => {

      const result = await usersRepository.findUserWithPass({ username: user.username })

      expect(result.id).toEqual(user.id)
      expect(result.username).toEqual(user.username)
      expect(result.password).toEqual(user.password)
      expect(usersRepository.findUserWithPass).toHaveBeenCalledWith({ username: user.username })
    })

    it('should throw an exception', () => {

      jest.spyOn(usersRepository, 'findUserWithPass').mockRejectedValueOnce(new Error())

      expect(usersService.findUserWithPass(user.username)).rejects.toThrowError()
    })
  })

  describe('getProfile', () => {

    it('should be able to return the profile of the current user', async () => {

      const result = await usersService.getProfile(user.id)

      expect(result.username).toEqual(profile.username)
      expect(usersRepository.findOne).toHaveBeenCalledWith({ id: user.id })
    })

    it('should throw a not found exception', async () => {

      jest.spyOn(usersService, 'getProfile').mockRejectedValueOnce(new NotFoundException())

      expect(usersService.getProfile(user.id)).rejects.toThrowError(NotFoundException)
    })
  })
})