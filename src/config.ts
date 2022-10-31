import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbHost: process.env.DATABASE_HOST,
      dbUser: process.env.DATABASE_USER,
      dbPort: parseInt(process.env.DATABASE_PORT, 10),
      dbPassword: process.env.DATABASE_PASSWORD,
      dbName: process.env.DATABASE_NAME,
    },
    apiKey: process.env.API_KEY,
  };
});
