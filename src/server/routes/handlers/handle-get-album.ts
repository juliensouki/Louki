import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Album from '../../db/schemas/Album';
import { GetPlaylistResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleGetAlbum = (req: Request, res: Response): void => {
  const id = req.params.albumId;
  databaseHandler.findOneInDocument(Album, '__id', id).then(albums => {
    if (albums && albums.length > 0) {
      const response: GetPlaylistResponse = albums[0];
      res.status(200).send(response);
    } else {
      const response: CustomError = {
        name: `Get album error`,
        message: `Couldn't get album for id ${id}`
      };
      logError(response);
      res.status(500).send(response);
    }
  });
};
