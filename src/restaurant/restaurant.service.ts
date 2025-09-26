import IRepository from '../shared/database/repository.interface';
import AddressEntity from './entities/address.entity';
import HoursOfOperationEntity from './entities/hours-of-operation.entity';
import RestaurantEntity from './entities/restaurant.entity';
import Restaurant, { IRestaurant } from './restaurant.model';

class RestaurantService {
  constructor(
    private readonly restaurantRepo: IRepository<RestaurantEntity>,
    private readonly hoursOfOpRepo: IRepository<HoursOfOperationEntity>,
    private readonly addressRepo: IRepository<AddressEntity>,
  ) {}

  async create(data: Partial<IRestaurant>) {
    await Restaurant.validate(data);
  }

  async delete(id: string) {
    throw new Error('teste');
  }
}

export default RestaurantService;
