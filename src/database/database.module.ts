import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '1234567';
const API_KEY_PROD = 'production KEY';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, dbHost, dbPassword, dbPort, dbUser } =
          configService.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, dbHost, dbPassword, dbPort, dbUser } =
          configService.postgres;
        const client = new Client({
          user: dbUser,
          password: dbPassword,
          port: dbPort,
          host: dbHost,
          database: dbName,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
