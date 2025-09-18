import 'reflect-metadata';
// Every other import should go after this line: 

import express from 'express';

import AppLogger from './shared/logger';
import router from './router';

class Application {
  static main() {
    const logger = new AppLogger();
    const server = express();
    server.use('/api/v1/',router);

    server.listen(3000, () => {
      logger.info('Server is running on port 3000');
    });
  }
}

Application.main();
