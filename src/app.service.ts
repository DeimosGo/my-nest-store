import { Injectable, Inject } from '@nestjs/common';
import { /* ConfigService */ ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    /* private configService: ConfigService, */
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    /*
    const apiKey = this.configService.get<string>('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(this.tasks);
    */
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.port;
    return `
    Hello World!
    apikey: ${apiKey}
    dbName: ${dbName}
    dbPort: ${dbPort}
    `;
  }
}
