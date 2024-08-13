import { CreateJobDto } from '@app/libs/contracts/jobs/create-job.dto';
import { PrismaService } from '@app/libs/core/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SchedulerMicroserviceService {
  constructor(private readonly db: PrismaService) {}
  async handleNewJob(job: CreateJobDto) {
    const newJob = await this.db.job.create({
      data: {
        name: job.name,
        data: job.data,
        queue: job.queue,
        next_run: job.scheduleDate ?? null,
      },
    });
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
