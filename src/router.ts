import { Router } from 'express';

import restaurantRoutes from './restaurant/restaurant.routes';

const v1router = Router();

v1router.use('/restaurants', restaurantRoutes);

v1router.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'OK',
    time: new Date(),
  });
});

export default v1router;
