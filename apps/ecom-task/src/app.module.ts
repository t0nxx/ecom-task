import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreLibraryModule } from '@app/libs/core-library';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreLibraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
