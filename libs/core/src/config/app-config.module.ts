import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databseConfig from './databse.config';
import msgBrokerConfig from './msg-broker.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databseConfig, msgBrokerConfig],
    }),
  ],
})
export class AppConfigModule {}
