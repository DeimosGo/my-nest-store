import { /* ConfigService */ ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import { Injectable, Inject /* , NotFoundException */ } from '@nestjs/common';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientPg: Client,
    /* private configService: ConfigService, */
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.postgres.dbName;
    const dbPort = this.configService.postgres.dbPort;
    return `
    Hello World!
    apikey: ${apiKey}
    dbName: ${dbName}
    dbPort: ${dbPort}
    `;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
          /* throw new NotFoundException('No se encontraron elementos'); */
        }
        resolve(res.rows);
      });
    });
  }
}
