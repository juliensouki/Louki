import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { RemoveMusicResponse } from '../../../shared/RoutesResponses';

export const handleRemoveMusic = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { musicId } = req.body;

  databaseHandler.removeFromArray(Playlist, '__id', playlistId, 'musics', musicId).then(() => {
    databaseHandler.findOneInDocument(Playlist, '__id', playlistId).then(values => {
      const response: RemoveMusicResponse = values[0];
      res.status(200).json(response);
    });
  });
};
