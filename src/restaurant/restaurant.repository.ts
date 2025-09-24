import Repository from '../shared/repository';
import AddressEntity from './entities/address.entity';
import HoursOfOperationEntity from './entities/hours-of-operation.entity';
import RestaurantEntity from './entities/restaurant.entity';
import { Address } from './restaurant.model';

class AddressRepository extends Repository<AddressEntity> {}

class HoursOfOperationRepository extends Repository<HoursOfOperationEntity> {}

interface Insert extends Partial<RestaurantEntity> {
  address: Address;
}

class RestaurantRepository extends Repository<RestaurantEntity> {
  async create(data: Insert): Promise<RestaurantEntity> {
    const { address, hoursOfOperation } = data;

    const addRepo = new AddressRepository(AddressEntity);
    const hoursRepo = new HoursOfOperationRepository(HoursOfOperationEntity);

    const restaurant = await super.create(data);

    await addRepo.create({ ...address, restaurant });

    hoursOfOperation?.forEach(async (teste) => {
      await hoursRepo.create({ ...teste, restaurant });
    });

    return restaurant;
  }
}

export default RestaurantRepository;
