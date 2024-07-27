import { registerAs } from '@nestjs/config';

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH || 'refresh',
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '2d',
  DATABASE: {
    TYPE: process.env.DATABASE_TYPE || 'postgres',
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: Number(process.env.DATABASE_PORT) || 5432,
    USERNAME: process.env.DATABASE_USERNAME || 'root',
    PASSWORD: process.env.DATABASE_PASSWORD || '123',
    NAME: process.env.DATABASE_NAME || 'english_school',
  },
  MAIL: {
    HOST: process.env.MAIL_HOST || 'smtp.mailersend.net',
    PORT: Number(process.env.MAIL_PORT) || 587,
    SECURITY: Boolean(process.env.MAIL_SECURITY) || false,
    USER: process.env.MAIL_USER || 'MS_kIfsn8@patricknicezi.tech',
    PASSWORD: process.env.MAIL_PASSWORD || 'D3IjrLkZ3Qkct1OZ',
    FROM: process.env.MAIL_FROM || '',
  },
};

export default registerAs('env', () => env);
