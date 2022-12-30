import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
  }))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Desafio Sharenergy')
    .setDescription('Api desenvolvida para o desafio da Sharenergy')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(8080)
}
bootstrap()