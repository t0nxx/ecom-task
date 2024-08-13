import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJobDto } from '@app/libs/contracts/jobs/create-job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jobs')
  getAllJobs() {
    return this.appService.getAllJobs();
  }

  @Get('jobs/:id')
  getOneJob(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.getOneJob(id);
  }

  @Post('jobs')
  createJob(@Body() createJobDto: CreateJobDto) {
    return this.appService.createJob(createJobDto);
  }
}
