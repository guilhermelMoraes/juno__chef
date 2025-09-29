import pino from 'pino';

class AppLogger {
  constructor(
    private readonly name: string,
  ) {}

  private readonly logger = pino();

  info(data: unknown): void {
    this.logger.info(`[${this.name}]: ${data}`);
  }

  warn(data: unknown): void {
    this.logger.warn(`[${this.name}]: ${data}`);
  }

  fatal(data: unknown): void {
    this.logger.fatal(`[${this.name}]: ${data}`);
  }
}

export default AppLogger;
