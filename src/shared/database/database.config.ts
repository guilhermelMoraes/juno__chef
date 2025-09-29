import { DataSource } from 'typeorm';

import AddressEntity from '../../restaurant/entities/address.entity';
import OpenFromEntity from '../../restaurant/entities/open-from.entity';
import RestaurantEntity from '../../restaurant/entities/restaurant.entity';
import AppLogger from '../logger';

class DatabaseConfig {
  private constructor() {}

  private readonly logger = AppLogger.getInstance();
  private static instance: null | DatabaseConfig = null;

  readonly appDataSource = new DataSource({
    applicationName: 'juno-kitchen',
    type: 'postgres',
    host: String(process.env.DB_HOST),
    port: parseInt(process.env.DB_PORT!),
    database: String(process.env.DATABASE),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    synchronize: process.env.NODE_ENV === 'development',
    entities: [RestaurantEntity, AddressEntity, OpenFromEntity],
  });

  async connect(): Promise<void> {
    try {
      await this.appDataSource.initialize();
      this.logger.info('Successfully connected to the database');
    } catch (error) {
      this.logger.fatal(error);
    }
  }

  static getInstance(): DatabaseConfig {
    this.instance ??= new DatabaseConfig();
    return this.instance;
  }
}

export default DatabaseConfig;
