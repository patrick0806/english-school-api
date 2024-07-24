import { registerAs } from '@nestjs/config';

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
  DATABASE: {
    TYPE: process.env.DATABASE_TYPE || 'postgres',
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: Number(process.env.DATABASE_PORT) || 5432,
    USERNAME: process.env.DATABASE_USERNAME || 'root',
    PASSWORD: process.env.DATABASE_PASSWORD || '123',
    NAME: process.env.DATABASE_NAME || 'english_school',
  },
};

export default registerAs('env', () => env);
