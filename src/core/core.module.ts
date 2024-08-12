import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';

@Global()
@Module({
  imports: [DatabaseModule, AppConfigModule],
  exports: [DatabaseModule, AppConfigModule],
})
export class CoreModule {}
