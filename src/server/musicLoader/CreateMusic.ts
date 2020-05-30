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

  try {
    const music: Music = await MusicSchema.create({ ...values, artist: artistId, album: albumId });
    addMusicRoute(music);
    logger.info('Added music ' + values.__id);
  } catch (err) {
    logError(err);
  }
};
