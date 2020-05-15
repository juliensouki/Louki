import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Album from '../../db/schemas/Album';
import { GetPlaylistResponse } from '../../../shared/RoutesResponses';

export const handleGetAlbum = (req: Request, res: Response): void => {
  const id = req.params.albumId;
  databaseHandler.findOneInDocument(Album, '__id', id).then(albums => {
    if (albums && albums.length > 0) {
      const response: GetPlaylistResponse = albums[0];
      res.status(200).json(response);
    } else {
      res.json(null);
    }
  });
};
