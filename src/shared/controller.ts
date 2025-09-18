import Repository from "./repository.interface";

abstract class ExpressController {
  private readonly repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  async list(): Promise<void> {

  }
}

export default ExpressController;
