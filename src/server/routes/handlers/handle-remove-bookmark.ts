import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';
import { RemoveBookmarkResponse } from '../../../shared/RoutesResponses';

export const handleRemoveBookmark = (req: Request, res: Response): void => {
  const id = req.body.musicId;

  databaseHandler.removeFromArray(User, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
        const response: RemoveBookmarkResponse = (values[0] as IUser).favorites;
        res.json(response);
      });
    },
    error => {
      console.log(error);
      res.send(null);
    },
  );
};
