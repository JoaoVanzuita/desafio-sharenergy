import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { ClientsService } from './clients.service'
import { ClientDto } from './dto/request/client.dto'
import { QueryParamsDto } from './dto/request/query-params.dto'
import { DefaultClientsResponseDto } from './dto/response/default-clients-response.dto'
import { FindWithFiltersResponseDto } from './dto/response/find-with-filters-response.dto'

@Controller('clients')
@ApiTags('Clientes')
@ApiCookieAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  @ApiExtraModels(DefaultClientsResponseDto)
  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(DefaultClientsResponseDto),
    },
  })
  create(@Body() createClientDto: ClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @Get('search')
  @ApiExtraModels(FindWithFiltersResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(FindWithFiltersResponseDto),
    },
  })
  findWithFilters(@Query() queryParams: QueryParamsDto) {
    const { name, page, results } = queryParams
    return this.clientsService.findWithFilters(name, page, results)
  }


  @Get(':id')
  @ApiExtraModels(DefaultClientsResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultClientsResponseDto),
    },
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id)
  }

  @Put(':id')
  @ApiExtraModels(DefaultClientsResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultClientsResponseDto),
    },
  })
  update(@Param('id') id: string, @Body() updateClientDto: ClientDto) {
    return this.clientsService.update(id, updateClientDto)
  }

  @Delete(':id')
  @ApiExtraModels(DefaultClientsResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultClientsResponseDto),
    },
  })
  delete(@Param('id') id: string) {
    return this.clientsService.delete(id)
  }
}
