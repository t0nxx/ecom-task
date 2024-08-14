import { JOB_PATTERNS } from '@app/libs/contracts/jobs/patterns';
import { SCHEDULER_MICROSERVICE_CONTRACT } from '@app/libs/contracts/microservices/scheduler-microservice';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(SCHEDULER_MICROSERVICE_CONTRACT.injection_token)
    private _schedulerServiceClient: ClientProxy,
  ) {}
  getAllJobs() {
    return (
      this._schedulerServiceClient
        .send(JOB_PATTERNS.GET_ALL, {})
        // timeout if the microservice is not available
        .pipe(timeout(10000))
    );
  }

  getOneJob(jobId: string) {
    return this._schedulerServiceClient
      .send(JOB_PATTERNS.GET_ONE, jobId) // timeout if the microservice is not available
      .pipe(timeout(10000));
  }

  createJob(createJobDto: any) {
    this._schedulerServiceClient.emit(JOB_PATTERNS.CREATE, createJobDto);
    return 'Your job is processing. Thank you';
  }
}
