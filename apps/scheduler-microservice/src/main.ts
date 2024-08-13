import { NestFactory } from '@nestjs/core';
import { SchedulerMicroserviceModule } from './scheduler-microservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@app/libs/core/config';
import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';

async function bootstrap() {
  // config cred
  const appConfig = await NestFactory.create(SchedulerMicroserviceModule);
  const configService = appConfig.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SchedulerMicroserviceModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: SCHEDULER_MICROSERVICE_CONTRACT.queue,
        urls: [
          'amqp://' +
            configService.get<IAppConfig['msgBroker']>('msgBroker')
              .RabbitMQ_USERNAME +
            ':' +
            configService.get<IAppConfig['msgBroker']>('msgBroker')
              .RabbitMQ_PASSWORD +
            '@' +
            configService.get<IAppConfig['msgBroker']>('msgBroker')
              .RabbitMQ_URL,
        ],
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  // app listen
  app.listen();
  console.log('Scheduler Microservice is listening');
}
bootstrap();
