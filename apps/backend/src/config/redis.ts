import Redis from 'ioredis';
import { env } from './environment';

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    if (times > 3) {
      console.error('Redis: max retries reached');
      return null;
    }
    return Math.min(times * 200, 2000);
  },
});

redis.on('connect', () => console.log('Redis: connected'));
redis.on('error', (err) => console.error('Redis: error', err.message));
