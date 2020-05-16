import { Request, Response } from 'express';
import databaseHandler from '../../db';
import AlbumSchema from '../../db/schemas/AlbumSchema';
import ArtistSchema from '../../db/schemas/ArtistSchema';
import MusicSchema from '../../db/schemas/MusicSchema';
import UserSchema from '../../db/schemas/UserSchema';
import { User } from '../../../shared/LoukiTypes';
import { LoadLoukiResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleLoadLouki = async (req: Request, res: Response) => {
  const musics = await databaseHandler.getCollectionContent(MusicSchema);
  const artists = await databaseHandler.getCollectionContent(ArtistSchema);
  const albums = await databaseHandler.getCollectionContent(AlbumSchema);
  databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
    users => {
      if (users && users.length > 0) {
        const bookmarks = (users[0] as User).favorites;

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
    },
  );
};
