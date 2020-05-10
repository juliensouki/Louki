import { Request, Response } from 'express';
import databaseHandler from '../../db';
import User from '../../db/schemas/User';
import { AddBookmarkResponse } from '../../../shared/RoutesResponses';

export const handleAddBookmark = (req: Request, res: Response): void => {
  const id = req.body.musicId;

  databaseHandler.addToArray(User, 'selected', true, 'favorites', id).then(
    () => {
      databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
        const response: AddBookmarkResponse = values[0];
        res.json(response);
      });
    },
    error => {
      console.log(error);
      res.send(null);
    },
  );
};
