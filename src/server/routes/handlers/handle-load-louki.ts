import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Album from '../../db/schemas/Album';
import Artist from '../../db/schemas/Artist';
import Music from '../../db/schemas/Music';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';
import { LoadLoukiResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleLoadLouki = async (req: Request, res: Response) => {
  const musics = await databaseHandler.getCollectionContent(Music);
  const artists = await databaseHandler.getCollectionContent(Artist);
  const albums = await databaseHandler.getCollectionContent(Album);
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    if (users && users.length > 0) {
      const bookmarks = (users[0] as IUser).favorites;
  
      const response: LoadLoukiResponse = {
        musics: musics,
        artists: artists,
        albums: albums,
        bookmarks: bookmarks,
      };
  
      res.status(200).send(response);
    } else {
      const response: CustomError = {
        name: `Load Louki error`,
        message: `Couln't get current user`,
      };
      logError(response);
      res.status(500).send(response);
    }
  },
  error => {
    logError(error);
    res.status(500).send(error);
  });
};
