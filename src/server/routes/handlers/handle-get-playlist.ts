import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { GetPlaylistResponse } from '../../../shared/RoutesResponses';

export const handleGetPlaylist = (req: Request, res: Response): void => {
  const id = req.params.playlistId;

  databaseHandler.findOneInDocument(Playlist, '__id', id).then(playlists => {
    if (playlists && playlists.length > 0) {
      const response: GetPlaylistResponse = playlists[0];
      res.status(200).json(response);
    } else {
      res.json(null);
    }
  });
};
