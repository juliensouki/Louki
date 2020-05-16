import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import logger, { logError } from '../../logger';

export const handleAddMusic = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { musicId } = req.body;

  databaseHandler.findOneInDocument(Playlist, '__id', playlistId).then(values => {
    if (values[0].musics.includes(musicId)) {
      logger.info(`music ${musicId} already in playlist ${playlistId}`);
      res.status(403);    
  } else {
      databaseHandler.addToArray(Playlist, '__id', playlistId, 'musics', musicId).then(() => {
        res.sendStatus(200);
      },
      error => {
        logError(error);
        res.status(422).send(error.message);    
      });
    }
  },
  error => {
    logError(error);
    res.status(422).send(error.message);
  });
};
