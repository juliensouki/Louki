import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { AddFolderResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleAddFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;

  databaseHandler.addToArray(User, 'selected', true, 'musicPaths', folder).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      if (users && users.length > 0) {
        dLoader.watchFolder(folder);
        const response: AddFolderResponse = users[0];
        res.status(200).send(response);
      } else {
        const response: CustomError = {
          name: `Add folder error`,
          message: `Unable to get current user`,
        };
        logError(response);
        res.status(500).send(response);
      }
    });
  },
  error => {
    logError(error);
    res.status(500).send(error);
  });
};
