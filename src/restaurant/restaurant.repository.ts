import Repository from "../shared/repository.interface";

class RestaurantPostgreSql implements Repository {
  list(): Promise<unknown[]> {
    throw new Error("Method not implemented.");
  }
}

export default RestaurantPostgreSql;
