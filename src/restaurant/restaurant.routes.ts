import { Router } from 'express';
import RestaurantController from './restaurant.controller';
import RestaurantRepository from './restaurant.repository';
import RestaurantEntity from './entities/restaurant.entity';

const routes = Router();

const repository = new RestaurantRepository(RestaurantEntity);
const controller = new RestaurantController(repository);

routes.post('', controller.create.bind(controller));

export default routes;
