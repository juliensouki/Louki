import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { TestSetupResponse } from '../../../shared/RoutesResponses';

export const handleTestSetup = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    const response: TestSetupResponse = users && users.length > 0;
    res.status(200).send(response);
  });
};
