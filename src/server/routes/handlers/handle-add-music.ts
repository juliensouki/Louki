import { Request, Response } from 'express';
import databaseHandler from '../../db';
import PlaylistSchema from '../../db/schemas/PlaylistSchema';
import { CustomError } from '../../../shared/RoutesResponses';
import logger, { logError } from '../../logger';

export const handleAddMusic = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { musicId } = req.body;

  databaseHandler.findOneInDocument(PlaylistSchema, '__id', playlistId).then(
    playlists => {
      if (playlists && playlists.length > 0) {
        if (playlists[0].musics.includes(musicId)) {
          logger.info(`music ${musicId} is already in playlist ${playlistId}`);
          res.status(403).send();
        } else {
          databaseHandler.addToArray(PlaylistSchema, '__id', playlistId, 'musics', musicId).then(
            () => {
              res.sendStatus(200).send();
            },
            error => {
              logError(error);
              res.status(500).send(error.message);
            },
          );
        }
      } else {
        const response: CustomError = {
          name: `Add music error`,
          message: `Unable to get playlist to check if music can be added`,
        };
        logError(response);
        res.status(422).send(response);
      }
    },
    error => {
      logError(error);
      res.status(500).send(error.message);
    },
  );
};
