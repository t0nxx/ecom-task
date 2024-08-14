import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor(SCHEDULER_MICROSERVICE_CONTRACT.queue)
export class SchedulerMicroserviceProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'notification': {
        await this.sendingNotificationsJob(job);
        break;
      }
      case 'email': {
        await this.sendingEmailJob(job);
        break;
      }
    }
  }

  async sendingEmailJob(job: Job) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  async sendingNotificationsJob(job: Job) {
    // delay 5 seconds (simulate processing time)
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}
