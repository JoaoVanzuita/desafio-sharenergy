import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'

import { ClientsService } from './clients.service'
import { CreateClientDto } from './dto/create-client.dto'
import { FindWithFiltersDto } from './dto/find-with-filters-response.dto'
import { QueryParamsDto } from './dto/query-params.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { Client } from './schemas/client.schema'

@Controller('clients')
@ApiTags('Clientes')
@ApiCookieAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto)
  }

  @Get('search')
  findWithFilters(@Query() queryParams: QueryParamsDto): Promise<FindWithFiltersDto> {
    const { name, page, results } = queryParams
    return this.clientsService.findWithFilters(name, page, results)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientsService.delete(id)
  }
}
