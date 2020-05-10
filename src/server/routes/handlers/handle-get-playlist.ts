import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';

export const handleGetPlaylist = (req: Request, res: Response): void => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Playlist, '__id', id).then(value => {
    if (value && value.length > 0) {
      res.json(value[0]);
    } else {
      res.json(null);
    }
  });
};
