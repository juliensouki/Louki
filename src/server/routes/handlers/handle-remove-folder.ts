import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { RemoveFolderResponse } from '../../../shared/RoutesResponses';

export const handleRemoveFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;
  databaseHandler.removeFromArray(User, 'selected', true, 'musicPaths', folder).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      dLoader.unwatchFolder(folder);
      const response: RemoveFolderResponse = users[0];
      res.status(200).json(response);
    });
  });
};
