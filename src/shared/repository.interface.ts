interface IRepository<T = unknown> {
  create(data: Partial<T>): Promise<T>;
}

export default IRepository;
