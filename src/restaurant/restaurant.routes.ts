import { Router } from 'express';
import RestaurantEntity from './entities/restaurant.entity';
import RestaurantRepository from './repositories/restaurant.repository';
import RestaurantController from './restaurant.controller';

const routes = Router();

const repository = new RestaurantRepository(RestaurantEntity);
const controller = new RestaurantController(repository);

routes.post('', controller.create.bind(controller));
routes.delete('/:id', controller.delete.bind(controller));

export default routes;
