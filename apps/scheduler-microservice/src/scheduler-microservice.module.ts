import { Module } from '@nestjs/common';
import { SchedulerMicroserviceController } from './scheduler-microservice.controller';
import { SchedulerMicroserviceService } from './scheduler-microservice.service';
import { CoreModule } from '@app/libs/core';

@Module({
  imports: [CoreModule],
  controllers: [SchedulerMicroserviceController],
  providers: [SchedulerMicroserviceService],
})
export class SchedulerMicroserviceModule {}
