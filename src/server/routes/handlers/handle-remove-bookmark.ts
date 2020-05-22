import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { User } from '../../../shared/LoukiTypes';
import { RemoveBookmark as RemoveBookmarkResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveBookmark = (req: Request, res: Response): void => {
  const id: string = req.body.musicId;

  databaseHandler.removeFromArray(UserSchema, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(UserSchema, 'selected', true).then(
        users => {
          if (users && users.length > 0) {
            const response: RemoveBookmarkResponse = (users[0] as User).favorites;
            res.status(200).send(response);
          } else {
            const response: CustomError = {
              name: `Remove bookmark error`,
              message: `Unable to get current user in order to remove music with id ${id} from bookrmarks`,
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
