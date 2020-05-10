import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { GetCurrentUserResponse } from '../../../shared/RoutesResponses';

export const handleGetCurrentUser = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    const response: GetCurrentUserResponse = users[0];
    res.json(response);
  });
};
