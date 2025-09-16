import 'reflect-metadata';
// Every other import should go after this line: 

import express from 'express';
import AppLogger from './logger';
import router from './router';

class Application {
  static main() {
    const logger = new AppLogger();
    const app = express();
    app.use(router);

    app.listen(3000, () => {
      logger.info('App is running on port 3000');
    });
  }
}

Application.main();
