import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databseConfig from './databse.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databseConfig],
    }),
  ],
})
export class AppConfigModule {}
