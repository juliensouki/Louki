import { io } from '../config';
import { Music } from '../../shared/LoukiTypes';
import db from '../db';
import logger from '../logger';
import { MusicSchema } from '../db/schemas';
import { deleteArtist, removeMusicFromArtist } from './DeleteOrUpdateArtist';
import { deleteAlbum, removeMusicFromAlbum } from './DeleteOrUpdateAlbum';

export const deleteMusic = (music: Music) => {
  db.deleteFromDocument(MusicSchema, '__id', music.__id).then(() => {
    logger.info('Deleted music ' + music.title);
    db.getCollectionContent(MusicSchema).then((musics: Array<Music>) => {
      io.sockets.emit('refresh_musics', musics);
    });
    db.findOneInDocument(MusicSchema, 'artist', music.artist).then((musics: Array<Music>) => {
      if (musics.length == 0) {
        deleteArtist(music.artist);
      } else {
        removeMusicFromArtist(music.artist, music.__id);
      }
    });
    db.findOneInDocument(MusicSchema, 'artist', music.album).then((musics: Array<Music>) => {
      if (musics.length == 0) {
        deleteAlbum(music.album);
      } else {
        removeMusicFromAlbum(music.album, music.__id);
      }
    });
  });
};
