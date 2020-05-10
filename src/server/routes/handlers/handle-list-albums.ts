import { Request, Response } from 'express';
import databaseHandler from '../../db/';
import Album from '../../db/schemas/Album';

export const handleListAlbums = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Album).then(value => {
    res.json(value);
  });
};
