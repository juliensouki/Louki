import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { ArtistSchema } from '../../db/schemas';
import { ListArtists as ListArtistsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListArtists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(ArtistSchema).then(
    (artists: ListArtistsResponse) => {
      res.status(200).send(artists);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
