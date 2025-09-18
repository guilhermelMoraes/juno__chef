interface Repository<T = unknown> {
  list(): Promise<T[]>;
}

export default Repository;
