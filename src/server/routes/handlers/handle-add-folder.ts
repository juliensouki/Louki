import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { AddFolderResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleAddFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;

  databaseHandler.addToArray(User, 'selected', true, 'musicPaths', folder).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      dLoader.watchFolder(folder);
      const response: AddFolderResponse = users[0];
      res.status(200).send(response);
    });
  },
  error => {
    logError(error);
    res.status(422).send(error);
  });
};
