import { Router } from 'express';
import RestaurantRepository from './database/restaurant.repository';
import RestaurantController from './restaurant.controller';
import RestaurantEntity from './database/entities/restaurant.entity';

const routes = Router();

const repository = new RestaurantRepository(RestaurantEntity);
const controller = new RestaurantController(repository);

routes.post('', controller.create.bind(controller));

export default routes;
