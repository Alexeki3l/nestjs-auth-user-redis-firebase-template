import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
ConfigModule.forRoot({
  // envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
});

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  entities: ['dist/**/*.entity.js'],
  // entities: [UserEntity],
  // migrations: [__dirname + '/../*.migrations/*{.ts,.js}'],
  synchronize: true,
  // migrationsRun: true,
  logging: false,
  // namingStrategy: new SnakeNamingStrategy(),
};
export const AppDS = new DataSource(DataSourceConfig);
