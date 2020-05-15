import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { ListPlaylistsResponse } from '../../../shared/RoutesResponses';

export const handleListPlaylists = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Playlist).then((playlists: ListPlaylistsResponse) => {
    res.status(200).json(playlists);
  });
};
