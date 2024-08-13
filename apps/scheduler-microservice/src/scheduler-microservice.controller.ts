import { Controller, Get, UseFilters } from '@nestjs/common';
import { SchedulerMicroserviceService } from './scheduler-microservice.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { JOB_PATTERNS } from '@app/libs/contracts/jobs/patterns';
import { CreateJobDto } from '@app/libs/contracts/jobs/create-job.dto';
import { ExceptionFilter } from '@app/libs/common/exception-filters/rpc-exception.filter';

@Controller()

export class SchedulerMicroserviceController {
  constructor(
    private readonly schedulerMicroserviceService: SchedulerMicroserviceService,
  ) {}
  @EventPattern(JOB_PATTERNS.CREATE)
  handleNewJob(@Payload() createJobDto: CreateJobDto) {
    return this.schedulerMicroserviceService.handleNewJob(createJobDto);
  }

  @MessagePattern(JOB_PATTERNS.GET_ALL)
  getAllJobs() {
    return this.schedulerMicroserviceService.getAllJobs();
  }

  @MessagePattern(JOB_PATTERNS.GET_ONE)
  @UseFilters(new ExceptionFilter())
  getOneJob(@Payload() id: string) {
    return this.schedulerMicroserviceService.getOneJob(id);
  }
}
