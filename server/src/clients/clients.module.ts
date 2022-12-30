import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'
import { ClientsRepository } from './repositories/clients.repository'
import { Client, ClientSchema } from './schemas/client.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository]
})
export class ClientsModule { }
