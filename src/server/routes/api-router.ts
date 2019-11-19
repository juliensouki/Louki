import bodyParser from 'body-parser';
import { Router } from 'express';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get('/test', (req, res) => {
    res.json("ok");
  });

  return router;
}
