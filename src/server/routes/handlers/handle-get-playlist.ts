import { Request, Response } from 'express';
import databaseHandler from '../../db';
import PlaylistSchema from '../../db/schemas/PlaylistSchema';
import { GetPlaylistResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleGetPlaylist = (req: Request, res: Response): void => {
  const id = req.params.playlistId;

  databaseHandler.findOneInDocument(PlaylistSchema, '__id', id).then(playlists => {
    if (playlists && playlists.length > 0) {
      const response: GetPlaylistResponse = playlists[0];
      res.status(200).send(response);
    } else {
      const response: CustomError = {
        name: `Get playlist error`,
        message: `Couldn't get artist from id ${id}`,
      };

      logError(response);
      res.status(500).send(response);
    }
  });
};
