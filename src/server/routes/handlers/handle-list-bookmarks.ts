import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';
import { ListBookmarksResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListBookmarks = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    if (users && users.length > 0) {
      const response: ListBookmarksResponse = (users[0] as IUser).favorites;
      res.status(200).send(response);
    } else {
      const response: CustomError = {
        name: `List bookmarks error`,
        message: `Couldn't get current user`,
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
