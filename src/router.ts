import { Router } from 'express';

// import restaurantRouter from './restaurant/restaurant.routes';

const router = Router();

// router.use('/restaurant', restaurantRouter);

router.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'OK',
    time: new Date(),
  });
});

export default router;
