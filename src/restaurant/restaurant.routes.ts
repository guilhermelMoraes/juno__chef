import { Router } from 'express';

import RestaurantEntity from './entities/restaurant.entity';
import RestaurantRepository from './repositories/restaurant.repository';
import RestaurantController from './restaurant.controller';
import RestaurantService from './restaurant.service';
import HoursOfOperationRepository from './repositories/hours-of-operation.repository';
import HoursOfOperationEntity from './entities/hours-of-operation.entity';
import AddressRepository from './repositories/address.repository';

const routes = Router();

const restaurantRepo = new RestaurantRepository(RestaurantEntity);
const hoursOfOpRepo = new HoursOfOperationRepository(HoursOfOperationEntity);
const addressRepo = new AddressRepository(AddressRepository);

const service = new RestaurantService(
  restaurantRepo,
  hoursOfOpRepo,
  addressRepo,
);

const controller = new RestaurantController(service);

routes.post('', controller.create.bind(controller));
routes.delete('/:id', controller.delete.bind(controller));

export default routes;
