import { Request, Response } from 'express';
import databaseHandler from '../../db';
import PlaylistSchema from '../../db/schemas/PlaylistSchema';
import { UpdatePlaylistResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleUpdatePlaylist = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { playlistName, playlistDescription } = req.body;

  const jsonUpdate = {
    name: playlistName,
    description: playlistDescription,
  };
  databaseHandler.updateDocument(PlaylistSchema, playlistId, jsonUpdate).then(
    () => {
      databaseHandler.getCollectionContent(PlaylistSchema).then(
        async playlists => {
          if (playlists && playlists.length > 0) {
            const currentPlaylist = await databaseHandler.findOneInDocument(PlaylistSchema, '__id', playlistId);
            const response: UpdatePlaylistResponse = {
              playlists: playlists,
              currentPlaylist: currentPlaylist[0],
            };
            res.status(200).send(response);
          } else {
            const response: CustomError = {
              name: `Update playlist error`,
              message: `Unable to get current playlist`,
            };
            logError(response);
            res.status(500).send(response);
          }
        },
        error => {
          logError(error);
          res.status(500).send(error);
        },
      );
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
