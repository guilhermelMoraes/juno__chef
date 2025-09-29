import { Router } from 'express';

import RestaurantEntity from './entities/restaurant.entity';
import RestaurantRepository from './repositories/restaurant.repository';
import RestaurantController from './restaurant.controller';
import RestaurantService from './restaurant.service';

const routes = Router();

const restaurantRepo = new RestaurantRepository(RestaurantEntity);
const service = new RestaurantService(restaurantRepo);
const controller = new RestaurantController(service);

routes.post('', controller.create.bind(controller));
routes.delete('/:id', controller.delete.bind(controller));

export default routes;
