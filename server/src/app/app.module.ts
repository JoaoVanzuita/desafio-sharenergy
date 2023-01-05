import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CustomersModule } from 'src/customers/customers.module'
import { HttpCatsModule } from 'src/http-cats/http-cats.module'
import { RandomDogsModule } from 'src/random-dogs/random-dogs.module'
import { RandomUsersModule } from 'src/random-users/random-users.module'

import { UsersModule } from '../users/users.module'

@Module({
  imports: [AuthModule, CustomersModule, UsersModule, RandomUsersModule, HttpCatsModule, RandomDogsModule, MongooseModule.forRoot(process.env.DATABASE_URL)],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule { }