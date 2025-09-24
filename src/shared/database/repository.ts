import {
  EntityTarget,
  ObjectLiteral,
  Repository as TORepository,
} from 'typeorm';

import DatabaseConfig from './database.config';
import IRepository from './repository.interface';
import JunoValidationError from '../juno-validation.error';

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

  async delete(id: string): Promise<void> {
    const result = await this.typeOrmRepo.softDelete(id);
    if (result.affected === 0) {
      throw new JunoValidationError('No resources were deleted');
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    // await this.typeOrmRepo.upda
    throw new Error('sdfsd');
  }
}

export default Repository;
