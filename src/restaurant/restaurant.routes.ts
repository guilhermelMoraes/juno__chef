import { Router } from 'express';

import RestaurantController from './restaurant.controller';

const routes = Router();

const restaurantController = new RestaurantController();

routes.get('/:id', restaurantController.findById.bind(restaurantController));
routes.post('', restaurantController.create.bind(restaurantController));
routes.patch('/:id', restaurantController.update.bind(restaurantController));
routes.delete('/:id', restaurantController.delete.bind(restaurantController));

export default routes;
