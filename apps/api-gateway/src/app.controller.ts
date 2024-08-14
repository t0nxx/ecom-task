import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJobDto } from '@app/libs/contracts/jobs/create-job.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
// @UseInterceptors(CacheInterceptor)
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
