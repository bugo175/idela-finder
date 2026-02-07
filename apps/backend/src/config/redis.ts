import Redis from 'ioredis';
import { env } from './environment';

const retryStrategy = (times: number) => {
  if (times > 3) {
    console.error('Redis: max retries reached');
    return null;
  }
  return Math.min(times * 200, 2000);
};

// Use REDIS_URL (Railway) if available, otherwise individual vars (local)
export const redis = env.REDIS_URL
  ? new Redis(env.REDIS_URL, { retryStrategy })
  : new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
      retryStrategy,
    });

redis.on('connect', () => console.log('Redis: connected'));
redis.on('error', (err) => console.error('Redis: error', err.message));
