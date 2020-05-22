import { Request, Response } from 'express';
import databaseHandler from '../../db';
import UserSchema from '../../db/schemas/UserSchema';
import { RemoveBookmark as RemoveBookmarkResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleRemoveBookmark = (req: Request, res: Response): void => {
  const id: string = req.body.musicId;

  databaseHandler.removeFromArray(UserSchema, 'selected', true, 'favorites', id).then(
    user => {
      const response: RemoveBookmarkResponse = user.favorites;
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
