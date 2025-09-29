import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository as TORepository,
} from 'typeorm';

import { ValidationError } from 'yup';
import DatabaseConfig from './database.config';
import IRepository from './repository.interface';
import { DataSource } from 'typeorm/browser';

abstract class Repository<T> implements IRepository<T> {
  private readonly typeOrmRepo: TORepository<ObjectLiteral>;
  private readonly ds: DataSource;

  constructor(entity: EntityTarget<ObjectLiteral>) {
    this.typeOrmRepo =
      DatabaseConfig.getInstance().appDataSource.getRepository(entity);

    this.ds = DatabaseConfig.getInstance().appDataSource;
  }

  async create(data: Partial<T> | Partial<T>[]): Promise<T> {
    const entity = await this.typeOrmRepo.save(data);
    return entity as T;
  }

  async delete(id: string): Promise<void> {
    const result = await this.typeOrmRepo.softDelete(id);
    if (result.affected === 0) {
      throw new ValidationError('No resources were deleted');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, data: Partial<T>): Promise<T> {
    throw new Error('teste');
  }

  async operationInTransaction(
    cb: (em: EntityManager) => Promise<T>,
  ): Promise<T> {
    const result = await this.ds.transaction(async (entityManager) => {
      return cb(entityManager);
    });

    return result;
  }
}

export default Repository;
