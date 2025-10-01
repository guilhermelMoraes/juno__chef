import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository as TORepository,
} from 'typeorm';
import { ValidationError } from 'yup';

import { DataSource } from 'typeorm/browser';
import DatabaseConfig from './database.config';
import IRepository, { FindOptions } from './repository.interface';

abstract class Repository<T> implements IRepository<T> {
  private readonly entityRepository: TORepository<ObjectLiteral>;
  private readonly ds: DataSource;

  constructor(entity: EntityTarget<ObjectLiteral>) {
    this.entityRepository =
      DatabaseConfig.getInstance().appDataSource.getRepository(entity);

    this.ds = DatabaseConfig.getInstance().appDataSource;
  }

  async findById(id: string, options: FindOptions): Promise<T> {
    const result = await this.entityRepository.findOne({
      where: {
        id,
      },
      ...options,
    });

    if (!result) {
      throw new ValidationError(`No resource with id ${id} was found`);
    }

    return result as T;
  }

  async create(data: Partial<T> | Partial<T>[]): Promise<T> {
    const entity = await this.entityRepository.save(data);
    return entity as T;
  }

  async delete(id: string): Promise<void> {
    const result = await this.entityRepository.softDelete(id);
    if (result.affected === 0) {
      throw new ValidationError(`No resource with id ${id} was found`);
    }
  }

  async patch(id: string, data: Partial<T>): Promise<void> {
    await this.entityRepository.update(id, data);
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
