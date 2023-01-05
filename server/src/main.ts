import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['*'],
    allowedHeaders: ['*', 'Content-Type'],
  })
  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
  }))

  const config = new DocumentBuilder()
    .setTitle('Desafio Sharenergy')
    .setDescription('Api desenvolvida para o desafio da Sharenergy')
    .setVersion('0.1')
    .addCookieAuth('access_token')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(8080)
}
bootstrap()