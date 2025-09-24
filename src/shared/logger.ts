import pino from 'pino';

class AppLogger {
  private constructor() {}

  private static instance: null | AppLogger = null;
  private readonly logger = pino();

  info(data: unknown): void {
    this.logger.info(data);
  }

  warn(data: unknown): void {
    this.logger.warn(data);
  }

  fatal(data: unknown): void {
    this.logger.fatal(data);
  }

  static getInstance(): AppLogger {
    this.instance ??= new AppLogger();
    return this.instance;
  }
}

export default AppLogger;
