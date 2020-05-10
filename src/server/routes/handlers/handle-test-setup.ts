import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';

export const handleTestSetup = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
    res.send(values && values.length > 0);
  });
};
