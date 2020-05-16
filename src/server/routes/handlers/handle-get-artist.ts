import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Artist from '../../db/schemas/Artist';
import { GetArtistResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleGetArtist = (req: Request, res: Response): void => {
  const id = req.params.artistId;

  databaseHandler.findOneInDocument(Artist, '__id', id).then(value => {
    if (value && value.length > 0) {
      const response: GetArtistResponse = value[0];

      res.status(200).send(response);
    } else {
      const response: CustomError = {
        name: `Get artist error`,
        message: `Couldn't get artist from id ${id}`,
      };

      logError(response);
      res.status(422).send(response);
    }
  });
};
