import { Request, Response } from 'express';
import AlbumSchema from '../../db/schemas/AlbumSchema';
import ArtistSchema from '../../db/schemas/ArtistSchema';
import UserSchema from '../../db/schemas/UserSchema';
import PlaylistSchema from '../../db/schemas/PlaylistSchema';
import MusicSchema from '../../db/schemas/MusicSchema';

export const handleReset = (req: Request, res: Response): void => {
  const promises = [
    UserSchema.deleteMany({}),
    MusicSchema.deleteMany({}),
    PlaylistSchema.deleteMany({}),
    ArtistSchema.deleteMany({}),
    AlbumSchema.deleteMany({}),
  ];

  Promise.all(promises).then(() => {
    res.status(200);
  });
};
