import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiCookieAuth, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

import { CustomersService } from './customers.service'
import { CustomerDto } from './dto/request/customer.dto'
import { QueryParamsDto } from './dto/request/query-params.dto'
import { DefaultCustomerResponseDto } from './dto/response/default-customer-response.dto'
import { FindWithFiltersResponseDto } from './dto/response/find-with-filters-response.dto'

@Controller('customers')
@ApiTags('Clientes')
@ApiCookieAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  @ApiOperation({
    summary: 'Criar um cliente'
  })
  @ApiExtraModels(DefaultCustomerResponseDto)
  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(DefaultCustomerResponseDto),
    },
  })
  create(@Body() createCustomerDto: CustomerDto) {
    return this.customersService.create(createCustomerDto)
  }

  @Get('search')
  @ApiOperation({
    summary: 'Pesquisa paginada de clientes por nome'
  })
  @ApiExtraModels(FindWithFiltersResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(FindWithFiltersResponseDto),
    },
  })
  findWithFilters(@Query() queryParams: QueryParamsDto) {
    const { name, page, results } = queryParams
    return this.customersService.findWithFilters(name, page, results)
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obter cliente por id'
  })
  @ApiExtraModels(DefaultCustomerResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultCustomerResponseDto),
    },
  })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar cliente por id'
  })
  @ApiExtraModels(DefaultCustomerResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultCustomerResponseDto),
    },
  })
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDto) {
    return this.customersService.update(id, updateCustomerDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar cliente por id'
  })
  @ApiExtraModels(DefaultCustomerResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(DefaultCustomerResponseDto),
    },
  })
  delete(@Param('id') id: string) {
    return this.customersService.delete(id)
  }
}
