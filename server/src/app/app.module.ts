import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

import { ClientsModule } from '../clients/clients.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [ClientsModule, AuthModule, UsersModule, MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule { }