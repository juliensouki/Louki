import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Artist from '../../db/schemas/Artist';
import { ListArtistsResponse } from '../../../shared/RoutesResponses';

export const handleListArtists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Artist).then((artists: ListArtistsResponse) => {
    res.json(artists);
  });
};
