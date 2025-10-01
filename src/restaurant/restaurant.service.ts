import { ValidationError } from 'yup';

import IRepository from '../shared/database/repository.interface';
import AddressEntity from './entities/address.entity';
import OpenFromEntity from './entities/open-from.entity';
import RestaurantEntity from './entities/restaurant.entity';
import Restaurant, { IRestaurant } from './restaurant.model';

class RestaurantService {
  constructor(private readonly repository: IRepository<RestaurantEntity>) {}

  async create(data: Partial<IRestaurant>): Promise<RestaurantEntity> {
    const {
      address: addressData,
      openFrom: openFromData,
      ...restaurantData
    } = await Restaurant.validate(data);

    const openFromHoursMatchDaysLength = openFromData?.some(
      (ofData) => ofData.days.length === ofData.hours.length,
    );

    if (!openFromHoursMatchDaysLength) {
      throw new ValidationError(
        `openFrom[i].hours and openFrom[i].days must have the same length`,
      );
    }

    const result = await this.repository.operationInTransaction(async (em) => {
      const rInstance = em.create(RestaurantEntity, restaurantData);
      const restaurant = await em.save(rInstance);

      const aInstance = em.create(AddressEntity, {
        restaurant,
        ...addressData,
      });
      await em.save(aInstance);

      const openFromHours = openFromData?.map(
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

  async findOne(id: string): Promise<RestaurantEntity> {
    return this.repository.findById(id, {
      relations: { address: true, openFrom: true },
    });
  }

  async update(id: string, data: Partial<IRestaurant>): Promise<void> {
    const result = await Restaurant.validate(data, true);
    await this.repository.patch(id, result as Partial<RestaurantEntity>);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}

export default RestaurantService;
