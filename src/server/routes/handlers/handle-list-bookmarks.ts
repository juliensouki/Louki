import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';
import { ListBookmarksResponse } from '../../../shared/RoutesResponses';

export const handleListBookmarks = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    if (users && users.length > 0) {
      const response: ListBookmarksResponse = (users[0] as IUser).favorites;
      res.status(200).json(response);
    } else {
      res.status(401);
    }
  });
};
