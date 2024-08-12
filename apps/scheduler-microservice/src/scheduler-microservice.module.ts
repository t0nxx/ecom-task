import { Module } from '@nestjs/common';
import { SchedulerMicroserviceController } from './scheduler-microservice.controller';
import { SchedulerMicroserviceService } from './scheduler-microservice.service';

@Module({
  imports: [],
  controllers: [SchedulerMicroserviceController],
  providers: [SchedulerMicroserviceService],
})
export class SchedulerMicroserviceModule {}
