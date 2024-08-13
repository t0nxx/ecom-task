import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // this act as a api gateway
  /**
   * Swagger Documentation Config
   */
  const config = new DocumentBuilder()
    .setTitle('ECOM TASK API GATEWAY')
    .setDescription('The ECOM TASK')
    .setVersion('1.0')
    .addTag('ECOM API GATEWAY')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
