import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Album from '../../db/schemas/Album';

export const handleGetAlbum = (req: Request, res: Response): void => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Album, '__id', id).then(value => {
    if (value && value.length > 0) {
      res.json(value[0]);
    } else {
      res.json(null);
    }
  });
};
