import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClientsModule } from '../clients/clients.module'

@Module({
  imports: [ClientsModule, MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [],
  providers: [],
})
export class AppModule { }