import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { DeletePlaylistResponse } from '../../../shared/RoutesResponses';

export const handleDeletePlaylist = (req: Request, res: Response): void => {
  const id = req.body.playlistId;

  databaseHandler.deleteFromDocument(Playlist, '__id', id).then(() => {
    databaseHandler.getCollectionContent(Playlist).then((response: DeletePlaylistResponse) => {
      res.send(response);
    });
  });
};
