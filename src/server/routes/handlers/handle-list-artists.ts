import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Artist from '../../db/schemas/Artist';

export const handleListArtists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Artist).then(value => {
    res.json(value);
  });
};
