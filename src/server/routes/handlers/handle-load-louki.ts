import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Album from '../../db/schemas/Album';
import Artist from '../../db/schemas/Artist';
import Music from '../../db/schemas/Music';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';

export const handleLoadLouki = async (req: Request, res: Response) => {
  const musics = await databaseHandler.getCollectionContent(Music);
  const artists = await databaseHandler.getCollectionContent(Artist);
  const albums = await databaseHandler.getCollectionContent(Album);
  databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
    const bookmarks = (values[0] as IUser).favorites;
    res.json({
      musics: musics,
      artists: artists,
      albums: albums,
      bookmarks: bookmarks,
    });
  });
};
