import { Module } from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseStorageController } from './firebase-storage.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [FirebaseStorageController],
  providers: [FirebaseStorageService, RedisModule],
  imports: [RedisModule, UsersModule],
})
export class FirebaseStorageModule {}
