import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerMicroserviceController } from './scheduler-microservice.controller';
import { SchedulerMicroserviceService } from './scheduler-microservice.service';

describe('SchedulerMicroserviceController', () => {
  let schedulerMicroserviceController: SchedulerMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchedulerMicroserviceController],
      providers: [SchedulerMicroserviceService],
    }).compile();

    schedulerMicroserviceController = app.get<SchedulerMicroserviceController>(SchedulerMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schedulerMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
