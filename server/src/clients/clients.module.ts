import { Module } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { ClientsController } from './clients.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Client, ClientSchema } from './schemas/client.schema'
import { ClientsRepository } from './repositories/clients.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository]
})
export class ClientsModule { }
