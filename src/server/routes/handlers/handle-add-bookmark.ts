import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { User } from '../../../shared/LoukiTypes';
import UserSchema from '../../db/schemas/UserSchema';
import { AddBookmarkResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleAddBookmark = (req: Request, res: Response): void => {
  const id: string = req.body.musicId;

  databaseHandler.addToArray(UserSchema, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
        users => {
          if (users && users.length > 0) {
            const response: AddBookmarkResponse = (users[0] as User).favorites;
            res.status(200).send(response);
          } else {
            const response: CustomError = {
              name: `Add bookmark error`,
              message: `Unable to get current user`,
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
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
