import app from './app';
import { env } from './config/environment';
import { sequelize } from './config/database';
// Import to register model associations
import './database/index';

console.log('Starting iDealFinder backend...');
console.log(`PORT: ${env.PORT}, NODE_ENV: ${env.NODE_ENV}`);
console.log(`DATABASE_URL: ${env.DATABASE_URL ? 'set' : 'not set'}`);
console.log(`REDIS_URL: ${env.REDIS_URL ? 'set' : 'not set'}`);

async function start() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('PostgreSQL: connected');

    // Sync models in all environments for now (until migrations are set up)
    await sequelize.sync({ alter: true });
    console.log('Database: models synced');

    app.listen(env.PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`API prefix: ${env.API_PREFIX}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
