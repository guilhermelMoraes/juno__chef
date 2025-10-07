import { EntityManager } from 'typeorm';

type FindOptions = {
  relations?: Record<string, boolean>;
};

interface IRepository<T = unknown> {
  findById(id: string, options?: FindOptions): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  patch(id: string, data: Partial<T>): Promise<void>;
  operationInTransaction(
    cb: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}

export default IRepository;
export type { FindOptions };
