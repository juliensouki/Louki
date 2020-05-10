import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Artist from '../../db/schemas/Artist';

export const handleGetArtist = (req: Request, res: Response): void => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Artist, '__id', id).then(value => {
    if (value && value.length > 0) {
      res.json(value[0]);
    } else {
      res.json(null);
    }
  });
};
