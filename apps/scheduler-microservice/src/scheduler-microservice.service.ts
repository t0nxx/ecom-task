import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulerMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
