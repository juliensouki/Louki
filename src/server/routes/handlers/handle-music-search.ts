import { Request, Response } from 'express';
import databaseHandler from '../../db';
import Music from '../../db/schemas/Music';
import { MusicSearchResponse } from '../../../shared/RoutesResponses';
import leven from 'leven';

export const handleMusicSearch = (req: Request, res: Response): void => {
  const { searchText, musics } = req.body;
  databaseHandler.findMany(Music, '__id', musics as Array<string>).then(results => {
    if (results.length == 0) {
      res.json(results);
    } else {
      const response: MusicSearchResponse = [];
      results.forEach(music => {
        if (leven(searchText, music.title) < 10 || music.title.toLowerCase().includes(searchText.toLowerCase())) {
          response.push(music.__id);
        }
      });
      res.json(response);
    }
  });
};
