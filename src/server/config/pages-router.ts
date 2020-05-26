import { Router } from 'express';
import MusicSchema from '../db/schemas/MusicSchema';
import { getManifest } from './manifest-manager';

export function pagesRouter(db): Router {
  const router = Router();

  router.get('/api/v1/music/:id', (req, res) => {
    const id = req.params.id;
    db.findOneInDocument(MusicSchema, '__id', id).then(musics => {
      if (musics && musics.length > 0) {
        res.sendFile(musics[0].path);
      }
    });
  });

  router.get(`/**`, async (_, res) => {
    const manifest = await getManifest();
    res.render('page.ejs', { manifest });
  });

  return router;
}
