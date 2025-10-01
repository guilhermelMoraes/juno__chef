import { Router } from 'express';

import RestaurantEntity from './entities/restaurant.entity';
import RestaurantRepository from './repositories/restaurant.repository';
import RestaurantController from './restaurant.controller';
import RestaurantService from './restaurant.service';

const routes = Router();

const repository = new RestaurantRepository(RestaurantEntity);
const service = new RestaurantService(repository);
const controller = new RestaurantController(service);

routes.get('/:id', controller.findById.bind(controller));
routes.post('', controller.create.bind(controller));
routes.patch('/:id', controller.update.bind(controller));
routes.delete('/:id', controller.delete.bind(controller));

export default routes;
