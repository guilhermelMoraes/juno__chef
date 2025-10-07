import Repository from '../../shared/database/repository';
import RestaurantEntity from '../entities/restaurant.entity';

class RestaurantRepository extends Repository<RestaurantEntity> {
  constructor() {
    super(RestaurantEntity);
  }
}

export default RestaurantRepository;
