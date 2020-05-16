import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { ListPlaylistsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListPlaylists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Playlist).then((playlists: ListPlaylistsResponse) => {
    res.status(200).send(playlists);
  },
  error => {
    logError(error);
    res.status(422).send(error);
  });
};
