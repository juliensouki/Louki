import { Request, Response } from 'express';
import databaseHandler from '../../db/';
import AlbumSchema from '../../db/schemas/AlbumSchema';
import { ListAlbumsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListAlbums = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(AlbumSchema).then(
    (albums: ListAlbumsResponse) => {
      res.status(200).send(albums);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
