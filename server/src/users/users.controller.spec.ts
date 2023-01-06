import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuid } from 'uuid'

import { CreateUserDto } from './dto/request/create-user.dto'
import { UsersController } from './users.controller'
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

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          create: jest.fn().mockResolvedValue({
            id: uuid(),
            ...userCreate
          }),
          getProfile: jest.fn().mockResolvedValue(profile)
        }
      }],
    }).compile()

    usersController = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
    expect(usersService).toBeDefined()
  })

  describe('create', () => {

    it('should be able to create an user', async () => {

      const result = await usersController.create(userCreate)

      expect(result.id).toBeDefined()
      expect(result.username).toEqual(userCreate.username)
      expect(result.password).toBeUndefined()
    })

    it('should throw a bad request exception', () => {

      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new BadRequestException())

      expect(usersController.create(userCreate)).rejects.toThrowError(BadRequestException)
    })

  })

  describe('getProfile', () => {

    it('should be able to return the profile of the current user', async () => {

      const result = await usersController.getProfile(user)

      expect(result.username).toEqual(profile.username)
      expect(usersService.getProfile).toHaveBeenCalledWith(user.id)
    })
  })

  it('should throw a not found exception', async () => {

    jest.spyOn(usersService, 'getProfile').mockRejectedValueOnce(new NotFoundException())

    expect(usersController.getProfile(user)).rejects.toThrowError(NotFoundException)
  })
})