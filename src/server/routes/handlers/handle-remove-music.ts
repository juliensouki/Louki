import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { RemoveMusicResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveMusic = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { musicId } = req.body;

  databaseHandler.removeFromArray(Playlist, '__id', playlistId, 'musics', musicId).then(() => {
    databaseHandler.findOneInDocument(Playlist, '__id', playlistId).then(playlists => {
      if (playlists && playlists.length > 0) {
        const response: RemoveMusicResponse = playlists[0];
        res.status(200).send(response);
      } else {
        const response: CustomError = {
          name: `Remove music error`,
          message: `Unable to get updated playlist`,
        };
        logError(response);
        res.status(500).send(response);
      }
    },
    error => {
      logError(error);
      res.status(500).send(error);
    });
  },
  error => {
    logError(error);
    res.status(500).send(error);
  });
};
