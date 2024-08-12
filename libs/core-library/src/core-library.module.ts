import { Module } from '@nestjs/common';
import { CoreLibraryService } from './core-library.service';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [DatabaseModule, AppConfigModule],
  exports: [DatabaseModule, AppConfigModule],
  providers: [CoreLibraryService],
})
export class CoreLibraryModule {}
