import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databseConfig from './databse.config';
import msgBrokerConfig from './msg-broker.config';
import redisConfig from './redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databseConfig, msgBrokerConfig, redisConfig],
    }),
  ],
})
export class AppConfigModule {}
