import app from './app';
import { env } from './config/environment';
import { sequelize } from './config/database';
// Import to register model associations
import './database/index';

async function start() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('PostgreSQL: connected');

    // Sync models (dev only)
    if (env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database: models synced');
    }

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`API prefix: ${env.API_PREFIX}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
