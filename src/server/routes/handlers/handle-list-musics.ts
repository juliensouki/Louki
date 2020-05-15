import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Music from '../../db/schemas/Music';
import { ListMusicsResponse } from '../../../shared/RoutesResponses';

export const handleListMusics = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Music).then((musics: ListMusicsResponse) => {
    res.status(200).json(musics);
  });
};
