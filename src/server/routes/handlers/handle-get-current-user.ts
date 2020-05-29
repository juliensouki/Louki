import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { UserSchema } from '../../db/schemas';
import { GetCurrentUser as GetCurrentUserResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleGetCurrentUser = (req: Request, res: Response): void => {
  databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
    users => {
      if (users && users.length > 0) {
        const response: GetCurrentUserResponse = users[0];
        res.status(200).send(response);
      } else {
        const response: CustomError = {
          name: `Get user error`,
          message: `Couldn't get current user`,
        };
        logError(response);
        res.status(500).send(response);
      }
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
