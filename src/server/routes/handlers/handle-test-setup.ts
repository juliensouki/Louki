import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { TestSetup as TestSetupResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleTestSetup = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
    users => {
      const response: TestSetupResponse = users && users.length > 0;
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
