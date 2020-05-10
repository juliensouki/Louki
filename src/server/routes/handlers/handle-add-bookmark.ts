import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';

export const handleAddBookmark = (req: Request, res: Response): void => {
  const id = req.body.musicId;
  databaseHandler.addToArray(User, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
        res.json((values[0] as IUser).favorites);
      });
    },
    error => {
      console.log(error);
      res.send(null);
    },
  );
};
