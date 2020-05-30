import { Request, Response } from 'express';
import { UserSchema, PlaylistSchema, AlbumSchema, ArtistSchema, MusicSchema } from '../../db/schemas';

export const handleReset = (req: Request, res: Response): void => {
  const promises = [
    UserSchema.deleteMany({}),
    MusicSchema.deleteMany({}),
    PlaylistSchema.deleteMany({}),
    ArtistSchema.deleteMany({}),
    AlbumSchema.deleteMany({}),
  ];

  Promise.all(promises).then(() => {
    res.status(204).send();
  });
};
