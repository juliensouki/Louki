import { Request, Response } from 'express';
import databaseHandler from '../../db';
import fs from 'fs';
import UserSchema from '../../db/schemas/UserSchema';
import { AddFolder as AddFolderResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleAddFolder = (req: Request, res: Response, dLoader: any): void => {
  const { folder } = req.body;

  if (fs.existsSync(folder)) {
    databaseHandler.addToArray(UserSchema, 'selected', true, 'musicPaths', folder).then(
      user => {
        dLoader.watchFolder(folder);
        const response: AddFolderResponse = user;
        res.status(200).send(response);
      },
      error => {
        logError(error);
        res.status(500).send(error);
      },
    );
  } else {
    const response: CustomError = {
      name: `Add folder error`,
      message: `Folder ${folder} does not exist`,
    };
    res.status(422).send(response);
  }
};
