import fs from 'fs';
import db from '../db';
import { MusicSchema } from '../db/schemas';

export const cleanDB = (): void => {
  db.getCollectionContent(MusicSchema).then(musics => {
    musics.forEach(music => {
      if (!fs.existsSync(music.path)) {
        //DELETE MUSIC
      }
    });
  });
};
