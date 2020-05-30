import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { UserSchema } from '../../db/schemas';
import { AddBookmark as AddBookmarkResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleAddBookmark = (req: Request, res: Response): void => {
  const id: string = req.body.musicId;

  databaseHandler.addToArray(UserSchema, 'selected', true, 'favorites', id).then(
    user => {
      const response: AddBookmarkResponse = user.favorites;
      res.status(200).send(response);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
