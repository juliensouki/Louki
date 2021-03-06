import { Request, Response } from 'express';
import databaseHandler from '../../db';
import { MusicSchema } from '../../db/schemas';
import { MusicSearch as MusicSearchResponse } from '../../../shared/RoutesResponses';
import leven from 'leven';
import { logError } from '../../logger';

export const handleMusicSearch = (req: Request, res: Response): void => {
  const { searchText, musics } = req.body;
  databaseHandler.findMany(MusicSchema, '__id', musics as Array<string>).then(
    results => {
      if (results.length == 0) {
        res.status(200).send(results);
      } else {
        const response: MusicSearchResponse = [];
        results.forEach(music => {
          if (leven(searchText, music.title) < 10 || music.title.toLowerCase().includes(searchText.toLowerCase())) {
            response.push(music.__id);
          }
        });
        res.status(200).send(response);
      }
    },
    error => {
      logError(error);
      res.status(500).send(error);
    },
  );
};
