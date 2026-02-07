import { Sequelize } from 'sequelize';
import { env } from './environment';

const defineOptions = {
  timestamps: true,
  underscored: true,
  freezeTableName: true,
};

// Use DATABASE_URL (Railway) if available, otherwise individual vars (local)
export const sequelize = env.DATABASE_URL
  ? new Sequelize(env.DATABASE_URL, {
      dialect: 'postgres',
      logging: env.NODE_ENV === 'development' ? console.log : false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: defineOptions,
    })
  : new Sequelize({
      dialect: 'postgres',
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      logging: env.NODE_ENV === 'development' ? console.log : false,
      define: defineOptions,
    });
