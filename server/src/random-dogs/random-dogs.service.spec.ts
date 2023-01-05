import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { RandomDogsService } from './random-dogs.service'

describe('RandomDogsService', () => {
  let randomDogsService: RandomDogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomDogsService],
    }).compile()

    randomDogsService = module.get<RandomDogsService>(RandomDogsService)
  })

  it('should be defined', () => {
    expect(randomDogsService).toBeDefined()
  })

  describe('getRandomDog', () => {

    it('should be able to get a random dog', async () => {

      const result = await randomDogsService.getRandomDog()

      expect(result.mediaType).toMatch(/^image|video/)
      expect(result.url).toContain('https://random.dog/')
    })

    it('should throw an exception', async () => {

      jest.spyOn(randomDogsService, 'getRandomDog').mockRejectedValueOnce(new Error())

      expect(randomDogsService.getRandomDog()).rejects.toThrowError()
    })
  })
})
