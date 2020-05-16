import { Request, Response } from 'express';
import databaseHandler from '../../db';
import IUser from '../../../shared/IUser';
import User from '../../db/schemas/User';
import { AddBookmarkResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleAddBookmark = (req: Request, res: Response): void => {
  const id: string = req.body.musicId;

  databaseHandler.addToArray(User, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
        const response: AddBookmarkResponse = (values[0] as IUser).favorites;
        res.status(200).send(response);
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
