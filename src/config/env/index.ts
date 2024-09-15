import 'dotenv/config';
export default () => ({
  application: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwt: {
      secrect: process.env.JWT_SECRET || 'secret',
      expiration: process.env.JWT_EXPIRATION || '1d',
      refreshSecret: process.env.JWT_REFRESH_SECRET || 'secret',
      refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
      resetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET || 'secret',
      resetPasswordExpiration:
        process.env.JWT_RESET_PASSWORD_EXPIRATION || '1h',
    },
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    name: process.env.DATABASE_NAME || 'english_school',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '1234',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.mailersend.net',
    port: Number(process.env.MAIL_PORT) || 587,
    security: Boolean(process.env.MAIL_SECURITY) || false,
    user: process.env.MAIL_USER || 'MS_kIfsn8@patricknicezi.tech',
    password: process.env.MAIL_PASSWORD || 'D3IjrLkZ3Qkct1OZ',
    from: process.env.MAIL_FROM || '',
  },
});
