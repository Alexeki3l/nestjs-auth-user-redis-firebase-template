import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSourceConfig } from './utils/config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // trim() => para eliminar los espacios en blanco que Windows pone
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
