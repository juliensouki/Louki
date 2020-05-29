import sha1 from 'sha1';
import logger from '../logger';
import db from '../db';
import { AlbumSchema } from '../db/schemas';

export const createAlbum = async (musicId: string, albumName: string, artistName: string): Promise<void> => {
  if (albumName == undefined || artistName == undefined) return;
  const albumId = sha1(albumName);
  const artistId = sha1(artistName);

  if (albumName == '' || albumId == '') return;
  const album = new AlbumSchema({
    title: albumName,
    author: artistId,
    __id: albumId,
    musics: [musicId],
  });
  try {
    await album.save();
    logger.info('Album ' + albumName + ' was created');
  } catch (err) {
    await addMusicToAlbum(albumId, musicId);
  }
};

const addMusicToAlbum = async (albumId: string, musicId: string): Promise<void> => {
  await db.addToArray(AlbumSchema, '__id', albumId, 'musics', musicId);
  logger.info('Adding music ' + musicId + ' to album ' + albumId);
};
