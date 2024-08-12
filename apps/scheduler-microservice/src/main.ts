import { NestFactory } from '@nestjs/core';
import { SchedulerMicroserviceModule } from './scheduler-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
