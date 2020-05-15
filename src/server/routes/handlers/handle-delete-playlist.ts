import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { DeletePlaylistResponse } from '../../../shared/RoutesResponses';

export const handleDeletePlaylist = (req: Request, res: Response): void => {
  const { playlistId } = req.params;

  databaseHandler.deleteFromDocument(Playlist, '__id', playlistId).then(() => {
    databaseHandler.getCollectionContent(Playlist).then((response: DeletePlaylistResponse) => {
      res.status(200).send(response);
    });
  });
};
