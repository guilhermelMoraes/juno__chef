import {
  EntityTarget,
  ObjectLiteral,
  Repository as TORepository,
} from 'typeorm';

import DatabaseConfig from './database.config';
import IRepository from './repository.interface';

abstract class Repository<T> implements IRepository<T> {
  private readonly typeOrmRepo: TORepository<ObjectLiteral>;

  constructor(entity: EntityTarget<ObjectLiteral>) {
    this.typeOrmRepo =
      DatabaseConfig.getInstance().appDataSource.getRepository(entity);
  }

  async create(data: Partial<T> | Partial<T>[]): Promise<T> {
    const entity = await this.typeOrmRepo.save(data);
    return entity as T;
  }
}

export default Repository;
