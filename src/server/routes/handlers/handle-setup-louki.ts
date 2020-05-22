import { Request, Response } from 'express';
import UserSchema from '../../db/schemas/UserSchema';
import { SetupLoukiResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleSetupLouki = (req: Request, res: Response): void => {
  const file = (req as any).file;
  const id = 0;

  UserSchema.create({
    name: req.body.username,
    picture: file ? `/assets/uploads/${id}.${file['mimetype'].split('image/')[1]}` : '',
    selected: true,
    __id: 0,
    settings: {
      language: 'english',
      localStorageUsage: req.body['local-storage-usage'] === 'true',
      internetUsage: true,
    },
  }).then(
    (response: SetupLoukiResponse) => {
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
