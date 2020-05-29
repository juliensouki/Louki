import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { UserSchema } from '../../db/schemas';
import { RemoveFolder as RemoveFolderResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';
import filesWatcher from '../../filesWatcher';

export const handleRemoveFolder = (req: Request, res: Response): void => {
  const { folder } = req.body;

  databaseHandler.removeFromArray(UserSchema, 'selected', true, 'musicPaths', folder).then(
    user => {
      filesWatcher.unwatchFolder(folder);
      const response: RemoveFolderResponse = user;
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
