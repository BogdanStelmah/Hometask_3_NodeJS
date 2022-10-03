import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000

  app.enableCors({
      origin: [
        process.env.CLIENT_URL || 'http://localhost:3001'
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
  })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT)
      .then(() => {
        console.log(`Server has been started on POST: ${PORT}`)
      });
}

bootstrap();
