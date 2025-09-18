import pino from 'pino';

class AppLogger {
  private readonly logger = pino();

  info(data: unknown): void {
    this.logger.info(data);
  }
}

export default AppLogger;
