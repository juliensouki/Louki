import { Request, Response } from 'express';
import Album from '../../db/schemas/Album';
import Artist from '../../db/schemas/Artist';
import User from '../../db/schemas/User';
import Playlist from '../../db/schemas/Playlist';
import Music from '../../db/schemas/Music';

export const handleReset = (req: Request, res: Response): void => {
  const promises = [
    User.deleteMany({}),
    Music.deleteMany({}),
    Playlist.deleteMany({}),
    Artist.deleteMany({}),
    Album.deleteMany({}),
  ];

  Promise.all(promises).then(() => {
    res.status(200);
  });
};
