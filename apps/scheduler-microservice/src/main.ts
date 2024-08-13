import { NestFactory } from '@nestjs/core';
import { SchedulerMicroserviceModule } from './scheduler-microservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@app/libs/core/config';

async function bootstrap() {
  // config cred
  const appConfig = await NestFactory.create(SchedulerMicroserviceModule);
  const configService = appConfig.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SchedulerMicroserviceModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://' + configService.get<IAppConfig['msgBroker']>('msgBroker')
          .MQTT_BROKER_URL,
        port: +configService.get<IAppConfig['msgBroker']>('msgBroker')
          .MQTT_BROKER_PORT,
        username:
          configService.get<IAppConfig['msgBroker']>('msgBroker')
            .MQTT_BROKER_USERNAME,
        password:
          configService.get<IAppConfig['msgBroker']>('msgBroker')
            .MQTT_BROKER_PASSWORD,
      },
    },
  );

  // app listen
  app.listen();
  console.log('Scheduler Microservice is listening');
}
bootstrap();
