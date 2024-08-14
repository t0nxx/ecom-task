import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';
import { PrismaService } from '@app/libs/core/database/prisma.service';
import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';

@QueueEventsListener(SCHEDULER_MICROSERVICE_CONTRACT.queue)
export class SchedulerMicroserviceEventsListener extends QueueEventsHost {
  constructor(private readonly db: PrismaService) {
    super();
  }
  @OnQueueEvent('active')
  async onActive(job: { jobId: string; prev?: string }) {
    await this.db.job.update({
      where: { id: job.jobId },
      data: { last_run: new Date(), status: 'processing' },
    });
    console.log(`Job Processing. ${job.jobId}`);

  }

  @OnQueueEvent('completed')
  async onCompleted(job: { jobId: string; prev?: string }) {
    await this.db.job.update({
      where: { id: job.jobId },
      data: { status: 'completed' },
    });
    console.log(`Job completed. ${job.jobId} `);
  }

  @OnQueueEvent('failed')
  async onFailed(job: { jobId: string; prev?: string }) {
    console.log(`Job failed. ${job.jobId} `);
  }
}
