import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import IUser from '../../../shared/IUser';
import { RemoveBookmarkResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveBookmark = (req: Request, res: Response): void => {
  const id: string = req.body.musicId;

  databaseHandler.removeFromArray(User, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
        if (users && users.lenght > 0) {
          const response: RemoveBookmarkResponse = (users[0] as IUser).favorites;
          res.send(response);
        } else {
          const response: CustomError = {
            name: `Remove bookmark error`,
            message: `Unable to get current user in order to remove music with id ${id} from bookrmarks`,
          };
          logError(response);
          res.status(422).send(response);
        }
      },
      error => {
        logError(error);
        res.status(422).send(error);
      });
    },
    error => {
      logError(error);
      res.status(422).send(error);
    },
  );
};
