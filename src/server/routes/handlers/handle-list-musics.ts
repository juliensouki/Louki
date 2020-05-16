import { Request, Response } from 'express';
import databaseHandler from '../../db';
import MusicSchema from '../../db/schemas/MusicSchema';
import { ListMusicsResponse } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handleListMusics = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(MusicSchema).then(
    (musics: ListMusicsResponse) => {
      res.status(200).send(musics);
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
