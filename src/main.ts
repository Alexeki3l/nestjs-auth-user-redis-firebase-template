import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalGuards();
  app.enableCors();
  const descriptionDoc = `Here some about the documentation.`;
  const config = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('Documentation')
    .setDescription(descriptionDoc)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
