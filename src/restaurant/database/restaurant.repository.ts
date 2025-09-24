import Repository from '../../shared/database/repository';
import { Address } from '../restaurant.model';
import AddressRepository from './address.repository';
import AddressEntity from './entities/address.entity';
import HoursOfOperationEntity from './entities/hours-of-operation.entity';
import RestaurantEntity from './entities/restaurant.entity';
import HoursOfOperationRepository from './hours-of-operation.repository';

interface Insert extends Partial<RestaurantEntity> {
  address: Address;
}

class RestaurantRepository extends Repository<RestaurantEntity> {
  private readonly addressRepository = new AddressRepository(AddressEntity);
  private readonly hoursOfOpRepository = new HoursOfOperationRepository(
    HoursOfOperationEntity,
  );

  async create(data: Insert): Promise<RestaurantEntity> {
    const { address, hoursOfOperation } = data;

    const restaurant = await super.create(data);
    await this.addressRepository.create({ ...address, restaurant });

    hoursOfOperation?.forEach(async (hoursOp) => {
      await this.hoursOfOpRepository.create({ ...hoursOp, restaurant });
    });

    return restaurant;
  }
}

export default RestaurantRepository;
