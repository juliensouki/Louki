import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';

export const handleListPlaylists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Playlist).then(playlists => {
    res.json(playlists);
  });
};
