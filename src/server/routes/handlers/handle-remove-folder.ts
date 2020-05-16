import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { RemoveFolderResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;

  databaseHandler.removeFromArray(UserSchema, 'selected', true, 'musicPaths', folder).then(
    () => {
      databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
        users => {
          if (users && users.length > 0) {
            dLoader.unwatchFolder(folder);
            const response: RemoveFolderResponse = users[0];
            res.status(200).send(response);
          } else {
            const response: CustomError = {
              name: `Remove folder error`,
              message: `Unable to get current user`,
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
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
