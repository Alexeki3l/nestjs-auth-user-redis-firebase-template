import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redis from '@nestjs-modules/ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    redis.RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
