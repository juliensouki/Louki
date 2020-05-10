import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import IPlaylist from '../../../shared/IPlaylist';

export const handleRemoveMusic = (req: Request, res: Response): void => {
  const { playlistId, musicId } = req.body;
  databaseHandler.removeFromArray(Playlist, '__id', playlistId, 'musics', musicId).then(() => {
    databaseHandler.findOneInDocument(Playlist, '__id', playlistId).then(values => {
      res.json(values[0] as IPlaylist);
    });
  });
};
