import { Request, Response } from 'express';
import User from '../../db/schemas/User';
import { SetupLoukiResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleSetupLouki = (req: Request, res: Response): void => {
  const file = (req as any).file;
  const id = 0;

  User.create({
    name: req.body.username,
    picture: file ? `/assets/uploads/${id}.${file['mimetype'].split('image/')[1]}` : '',
    selected: true,
    __id: 0,
    settings: {
      language: 'english',
      internetUsage: true,
    },
  }).then((response: SetupLoukiResponse) => {
    res.status(200).send(response);
  }, error => {
    logError(error);
    res.status(422).send(error);
  });
};
