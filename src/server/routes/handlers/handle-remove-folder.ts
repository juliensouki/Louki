import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';

export const handleRemoveFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;
  databaseHandler.removeFromArray(User, 'selected', true, 'musicPaths', folder).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      dLoader.unwatchFolder(folder);
      res.status(200).json(users[0]);
    });
  });
};
