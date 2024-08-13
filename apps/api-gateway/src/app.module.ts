import { CentralizedExceptionFilter } from '@app/libs/common/exception-filters/centralized-exception-filter.';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@app/libs/core';
import { IAppConfig } from '@app/libs/core/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    CoreModule,
    ClientsModule.registerAsync([
      {
        name: 'MQTT_BROKER',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url:
              'mqtt://' +
              configService.get<IAppConfig['msgBroker']>('msgBroker')
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
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CentralizedExceptionFilter,
    },
  ],
})
export class AppModule {}
