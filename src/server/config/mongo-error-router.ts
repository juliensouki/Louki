import { Router } from 'express';
import { getManifest } from './manifest-manager';

export function MongoDBErrorRouter(): Router {
  const router = Router();

  router.get(`/**`, async (_, res) => {
    const manifest = await getManifest();
    res.render('mongo-error.ejs', { manifest });
  });

  return router;
}
