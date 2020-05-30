import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { PlaylistSchema } from '../../db/schemas';
import { DeletePlaylist as DeletePlaylistResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleDeletePlaylist = (req: Request, res: Response): void => {
  const { playlistId } = req.params;

  databaseHandler.deleteFromDocument(PlaylistSchema, '__id', playlistId).then(
    () => {
      databaseHandler.getCollectionContent(PlaylistSchema).then(
        (response: DeletePlaylistResponse) => {
          res.status(200).send(response);
        },
        error => {
          logError(error);
          res.status(500).send(error.message);
        },
      );
    },
    error => {
      logError(error);
      res.status(500).send(error.message);
    },
  );
};
