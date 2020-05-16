import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Artist from '../../db/schemas/Artist';
import { ListArtistsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListArtists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Artist).then((artists: ListArtistsResponse) => {
    res.status(200).send(artists);
  },
  error => {
    logError(error);
    res.status(422).send(error);
  });
};
