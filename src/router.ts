import { Router } from 'express';

const router = Router();

router.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'OK',
    time: new Date(),
  });
});

export default router;
