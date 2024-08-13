import { JOB_PATTERNS } from '@app/libs/contracts/jobs/patterns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MQTT_BROKER') private MQTT_BROKER: ClientProxy) {}
  getAllJobs() {
    return this.MQTT_BROKER.send(JOB_PATTERNS.GET_ALL, {});
  }

  getOneJob(jobId: string) {
    return this.MQTT_BROKER.send(JOB_PATTERNS.GET_ONE, jobId);
  }

  createJob(createJobDto: any) {
    this.MQTT_BROKER.emit(JOB_PATTERNS.CREATE, createJobDto);
    return 'Your job is processing. Thank you';
  }
}
