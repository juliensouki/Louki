import uuid from 'uuid';
import sha1 from 'sha1';
import logger, { logError } from '../logger';
import { MusicSchema } from '../db/schemas';
import { Music } from '../../shared/LoukiTypes';
import { addMusicRoute } from '../routes';

export const addMusic = async (values: Music, artistName: string, albumName: string): Promise<any> => {
  if (artistName == undefined) {
    artistName = '';
  }
  if (albumName == undefined) {
    albumName = '';
  }
  const artistId = artistName == undefined ? '' : sha1(artistName);
  const albumId = albumName == undefined ? '' : sha1(albumName);
  const musicId = uuid.v4();

  try {
    const music: Music = await MusicSchema.create({ ...values, __id: musicId, artist: artistId, album: albumId });
    addMusicRoute(music);
    logger.info('Added music ' + musicId);
  } catch (err) {
    logError(err);
  }
};
