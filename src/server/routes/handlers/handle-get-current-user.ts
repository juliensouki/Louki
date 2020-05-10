import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';

export const handleGetCurrentUser = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    res.json(users[0]);
  });
};
