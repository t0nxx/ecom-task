import { CentralizedExceptionFilter } from '@app/libs/common/exception-filters/centralized-exception-filter.';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@app/libs/core';
import { IAppConfig } from '@app/libs/core/config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CentralizedExceptionFilter,
    },
    {
      provide: SCHEDULER_MICROSERVICE_CONTRACT.injection_token,
      useFactory: async (configService: ConfigService) => {
        const user =
          configService.get<IAppConfig['msgBroker']>(
            'msgBroker',
          ).RabbitMQ_USERNAME;
        const pass =
          configService.get<IAppConfig['msgBroker']>(
            'msgBroker',
          ).RabbitMQ_PASSWORD;
        const host =
          configService.get<IAppConfig['msgBroker']>('msgBroker').RabbitMQ_URL;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            queue: SCHEDULER_MICROSERVICE_CONTRACT.queue,
            urls: [`amqp://${user}:${pass}@${host}`],
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
