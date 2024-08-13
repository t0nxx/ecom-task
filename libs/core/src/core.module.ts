import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AppConfigModule],
  exports: [DatabaseModule, AppConfigModule],
})
export class CoreModule {}
