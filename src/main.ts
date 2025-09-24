import 'reflect-metadata';
// Every other import should go after this line:
import dotenv from '@dotenvx/dotenvx';
import express from 'express';

import v1router from './router';
import DatabaseConfig from './shared/database/database.config';
import AppLogger from './shared/logger';

class Application {
  private static readonly logger = AppLogger.getInstance();
  private static readonly port = parseInt(process.env.SERVER_PORT!) || 3000;

  static async main(): Promise<void> {
    dotenv.config({ ignore: ['MISSING_ENV_FILE'] });
    const database = DatabaseConfig.getInstance();

    await database.connect();
    const server = express();

    server.use(express.json());
    server.use('/api/v1', v1router);

    server.listen(this.port, () => {
      this.logger.info(`Server is running on port ${this.port}`);
    });
  }
}

Application.main();
