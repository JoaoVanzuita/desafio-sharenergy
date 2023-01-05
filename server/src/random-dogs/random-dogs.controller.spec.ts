import { Test, TestingModule } from '@nestjs/testing'

import { RandomDogsController } from './random-dogs.controller'
import { RandomDogsService } from './random-dogs.service'


describe('RandomDogsController', () => {
  let randomDogsController: RandomDogsController
  let randomDogsService: RandomDogsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomDogsController],
      providers: [{
        provide: RandomDogsService,
        useValue: {
          getRandomDog: jest.fn().mockResolvedValue({
            mediaType: 'video/mp4',
            url: 'https://random.dog/rSeiGNUY9BudTNar_YjtQFyvq4yLP5jaPjXR3jlubLU.mp4'
          })
        }
      }],
    }).compile()

    randomDogsController = module.get<RandomDogsController>(RandomDogsController)
    randomDogsService = module.get<RandomDogsService>(RandomDogsService)
  })

  it('should be defined', () => {
    expect(randomDogsController).toBeDefined()
    expect(randomDogsService).toBeDefined()
  })

  describe('getRandomDog', () => {

    it('should be able to get a random dog', async () => {

      const result = await randomDogsService.getRandomDog()

      expect(result.mediaType).toEqual('video/mp4')
      expect(result.url).toEqual('https://random.dog/rSeiGNUY9BudTNar_YjtQFyvq4yLP5jaPjXR3jlubLU.mp4')
    })

    it('should throw an exception', () => {

      jest.spyOn(randomDogsService, 'getRandomDog').mockRejectedValueOnce(new Error())

      expect(randomDogsController.getRandomDog()).rejects.toThrow()
    })
  })
})