import { CreateJobDto } from '@app/libs/contracts/jobs/create-job.dto';
import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';
import { PrismaService } from '@app/libs/core/database/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerMicroserviceService {
  constructor(
    private readonly db: PrismaService,
    @InjectQueue(SCHEDULER_MICROSERVICE_CONTRACT.queue)
    private serviceQueue: Queue,
  ) {}
  async handleNewJob(job: CreateJobDto) {
    const newJob = await this.db.job.create({
      data: {
        name: job.name,
        data: job.data,
        queue: SCHEDULER_MICROSERVICE_CONTRACT.queue,
        next_run:
          job.scheduleDate && new Date(job.scheduleDate).getTime() > Date.now()
            ? job.scheduleDate
            : null,
        interval_in_minutes: job.interval_in_minutes ?? 0,
      },
    });
    // queue job
    let options = {
      jobId: newJob.id,
    };
    // schedule job to run in a specific Date
    if (job.scheduleDate && new Date(job.scheduleDate).getTime() > Date.now()) {
      options['delay'] = new Date(job.scheduleDate).getTime() - Date.now();
    }
    // repeat job interval interval every x minutes
    if (job.interval_in_minutes && job.interval_in_minutes > 0) {
      options['repeat'] = {
        every: job.interval_in_minutes * 60 * 1000,
      };
    }
    await this.serviceQueue.add('notification', newJob, options);
    return newJob;
  }

  async getAllJobs() {
    const jobs = await this.db.job.findMany();
    return jobs;
  }

  async getOneJob(id: string) {
    const job = await this.db.job.findUnique({ where: { id } });
    if (!job) {
      throw new RpcException('job Not Found');
    }
    return job;
  }
}
