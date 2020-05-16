import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';
import { UpdatePlaylistResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleUpdatePlaylist = (req: Request, res: Response): void => {
  const { playlistId } = req.params;
  const { playlistName, playlistDescription } = req.body;

  const jsonUpdate = {
    name: playlistName,
    description: playlistDescription,
  };
  databaseHandler.updateDocument(Playlist, playlistId, jsonUpdate).then(() => {
    databaseHandler.getCollectionContent(Playlist).then(async playlists => {
      if (playlists && playlists.length > 0) {
        const currentPlaylist = await databaseHandler.findOneInDocument(Playlist, '__id', playlistId);
        const response: UpdatePlaylistResponse = {
          playlists: playlists,
          currentPlaylist: currentPlaylist[0],
        };
        res.status(200).json(response);
      } else {
        const response: CustomError = {
          name: `Update playlist error`,
          message: `Unable to get current playlist`,
        };
        logError(response);
        res.status(422).send(response);
      }
    },
    error => {
      logError(error);
      res.status(422).send(error);  
    });
  },
  error => {
    logError(error);
    res.status(422).send(error);
  });
};
