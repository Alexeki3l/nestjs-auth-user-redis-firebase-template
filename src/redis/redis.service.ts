import { Injectable } from '@nestjs/common';
import { CreateRediDto } from './dto/create-redi.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(userName: string): Promise<string> {
    return await this.redis.get(userName);
  }

  async set(userName: string, dataSetDto: CreateRediDto): Promise<void> {
    await this.redis.set(userName, JSON.stringify(dataSetDto));
  }

  async delete(userName: string): Promise<void> {
    await this.redis.del(userName);
  }
}
