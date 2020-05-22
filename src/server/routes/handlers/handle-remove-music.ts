import { Request, Response } from 'express';
import databaseHandler from '../../db';
import PlaylistSchema from '../../db/schemas/PlaylistSchema';
import { RemoveMusic as RemoveMusicResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveMusic = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { musicId } = req.body;

  databaseHandler.removeFromArray(PlaylistSchema, '__id', playlistId, 'musics', musicId).then(
    playlist => {
      const response: RemoveMusicResponse = playlist;
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
