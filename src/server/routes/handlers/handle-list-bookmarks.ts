import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';

export const handleListBookmarks = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(value => {
    if (value && value.length > 0) {
      res.status(200).json(value[0].favorites);
    } else {
      res.status(401);
    }
  });
};
