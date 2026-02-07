import dotenv from 'dotenv';

dotenv.config();

// Railway provides DATABASE_URL and REDIS_URL as single connection strings
export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Database: prefer DATABASE_URL (Railway) over individual vars (local)
  DATABASE_URL: process.env.DATABASE_URL || undefined,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'idealfinder',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  // Redis: prefer REDIS_URL (Railway) over individual vars (local)
  REDIS_URL: process.env.REDIS_URL || undefined,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  JWT_SECRET: process.env.JWT_SECRET || 'change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
};
