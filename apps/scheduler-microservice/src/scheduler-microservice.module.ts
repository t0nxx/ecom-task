import { Module } from '@nestjs/common';
import { SchedulerMicroserviceController } from './scheduler-microservice.controller';
import { SchedulerMicroserviceService } from './scheduler-microservice.service';
import { CoreModule } from '@app/libs/core';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@app/libs/core/config';
import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';
import { SchedulerMicroserviceProcessor } from './scheduler-microservice.processor';
import { SchedulerMicroserviceEventsListener } from './scheduler-microservice.event-listner';

@Module({
  imports: [
    CoreModule,
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<IAppConfig['redis']>('redis').REDIS_HOST,
          port: configService.get<IAppConfig['redis']>('redis').REDIS_PORT,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: SCHEDULER_MICROSERVICE_CONTRACT.queue,
    }),
  ],
  controllers: [SchedulerMicroserviceController],
  providers: [
    SchedulerMicroserviceService,
    SchedulerMicroserviceProcessor,
    SchedulerMicroserviceEventsListener,
  ],
})
export class SchedulerMicroserviceModule {}
