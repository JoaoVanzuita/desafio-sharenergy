import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { HttpCatsController } from './http-cats.controller'
import { HttpCatsService } from './http-cats.service'

describe('HttpCatsController', () => {
  let httpCatsController: HttpCatsController
  let httpCatsService: HttpCatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpCatsController],
      providers: [{
        provide: HttpCatsService,
        useValue: {
          getHttpCat: jest.fn().mockResolvedValue({
            url: 'https://http.cat/400'
          })
        }
      }],
    }).compile()

    httpCatsController = module.get<HttpCatsController>(HttpCatsController)
    httpCatsService = module.get<HttpCatsService>(HttpCatsService)
  })

  it('should be defined', () => {
    expect(httpCatsController).toBeDefined()
    expect(httpCatsService).toBeDefined()
  })

  describe('getHttpCat', () => {

    it('should be able to get a http cat with status 400', async () => {

      const result = await httpCatsService.getHttpCat('400')

      expect(result.url).toEqual('https://http.cat/400')
    })

    it('should throw a bad request exception', () => {

      jest.spyOn(httpCatsService, 'getHttpCat').mockRejectedValueOnce(new BadRequestException())

      expect(httpCatsController.getHttpCat('666')).rejects.toThrow(BadRequestException)
    })
  })
})