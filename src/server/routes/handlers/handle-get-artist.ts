import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Artist from '../../db/schemas/Artist';
import { GetArtistResponse } from '../../../shared/RoutesResponses';

export const handleGetArtist = (req: Request, res: Response): void => {
  const id = req.params.artistId;
  databaseHandler.findOneInDocument(Artist, '__id', id).then(value => {
    if (value && value.length > 0) {
      const response: GetArtistResponse = value[0];
      res.status(200).json(response);
    } else {
      res.json(null);
    }
  });
};
