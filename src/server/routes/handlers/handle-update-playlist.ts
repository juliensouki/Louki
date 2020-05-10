import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Playlist from '../../db/schemas/Playlist';

export const handleUpdatePlaylist = (req: Request, res: Response): void => {
  const { playlistId, playlistName, playlistDescription } = req.body;

  const jsonUpdate = {
    name: playlistName,
    description: playlistDescription,
  };
  databaseHandler.updateDocument(Playlist, playlistId, jsonUpdate).then(() => {
    databaseHandler.getCollectionContent(Playlist).then(async playlists => {
      const currentPlaylist = await databaseHandler.findOneInDocument(Playlist, '__id', playlistId);
      res.status(200).json({
        playlists: playlists,
        currentPlaylist: currentPlaylist[0],
      });
    });
  });
};
