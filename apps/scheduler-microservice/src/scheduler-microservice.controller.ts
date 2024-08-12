import { Controller, Get } from '@nestjs/common';
import { SchedulerMicroserviceService } from './scheduler-microservice.service';

@Controller()
export class SchedulerMicroserviceController {
  constructor(private readonly schedulerMicroserviceService: SchedulerMicroserviceService) {}

  @Get()
  getHello(): string {
    return this.schedulerMicroserviceService.getHello();
  }
}
