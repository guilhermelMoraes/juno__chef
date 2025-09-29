import IRepository from '../shared/database/repository.interface';
import AddressEntity from './entities/address.entity';
import OpenFromEntity from './entities/open-from.entity';
import RestaurantEntity from './entities/restaurant.entity';
import Restaurant, { IRestaurant } from './restaurant.model';

class RestaurantService {
  constructor(
    private readonly restaurantRepo: IRepository<RestaurantEntity>,
  ) {}

  async create(data: Partial<IRestaurant>): Promise<RestaurantEntity> {
    const {
      address: addressData,
      openFrom: openFromData,
      ...restaurantData
    } = await Restaurant.validate(data);

    const result = await this.restaurantRepo.operationInTransaction(async (em) => {
      const rInstance = em.create(RestaurantEntity, restaurantData);
      const restaurant = await em.save(rInstance);

      const aInstance = em.create(AddressEntity, {
        restaurant,
        ...addressData,
      });
      await em.save(aInstance);

      const openFromHours = openFromData.map(
        (opFrom): Partial<OpenFromEntity> => {
          return { restaurant, ...opFrom };
        },
      );

      const oInstance = em.create(OpenFromEntity, openFromHours);
      await em.save(oInstance);

      return restaurant;
    });

    return result;
  }

  async delete(id: string) {
    throw new Error('teste');
  }
}

export default RestaurantService;
