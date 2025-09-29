import { EntityManager } from 'typeorm';

interface IRepository<T = unknown> {
  create(data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<T>): Promise<T>;
  operationInTransaction(
    cb: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}

export default IRepository;
