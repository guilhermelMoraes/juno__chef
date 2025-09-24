import { Router } from 'express';

import restaurantRoutes from './restaurant/restaurant.routes';

const router = Router();

router.use('/restaurants', restaurantRoutes);

router.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'OK',
    time: new Date(),
  });
});

export default router;
