import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { PlaylistSchema } from '../../db/schemas';
import { ListPlaylists as ListPlaylistsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListPlaylists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(PlaylistSchema).then(
    (playlists: ListPlaylistsResponse) => {
      res.status(200).send(playlists);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
