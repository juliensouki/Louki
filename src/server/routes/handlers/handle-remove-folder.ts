import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { RemoveFolder as RemoveFolderResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;

  databaseHandler.removeFromArray(UserSchema, 'selected', true, 'musicPaths', folder).then(
    user => {
      dLoader.unwatchFolder(folder);
      const response: RemoveFolderResponse = user;
      console.log(folder, response);
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
