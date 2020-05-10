import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Music from '../../db/schemas/Music';

export const handleListMusics = (req: Request, res: Response): void => {
  databaseHandler.getCollectionContent(Music).then(musics => {
    res.json(musics);
  });
};
