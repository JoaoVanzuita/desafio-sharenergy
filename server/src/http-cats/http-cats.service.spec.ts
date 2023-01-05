import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { HttpCatsService } from './http-cats.service'

describe('HttpCatsService', () => {
  let httpCatsService: HttpCatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpCatsService],
    }).compile()

    httpCatsService = module.get<HttpCatsService>(HttpCatsService)
  })

  it('should be defined', () => {
    expect(httpCatsService).toBeDefined()
  })

  describe('getHttpCat', () => {

    it('should be able to get a http cat with status 400', async () => {

      const result = await httpCatsService.getHttpCat('400')

      expect(result.url).toEqual('https://http.cat/400')
    })

    it('should throw a bad request exception', async () => {

      expect(httpCatsService.getHttpCat('666')).rejects.toThrowError(BadRequestException)
    })
  })
})
