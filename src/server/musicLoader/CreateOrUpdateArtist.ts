import mongoose from 'mongoose';
import sha1 from 'sha1';
import logger from '../logger';
import db from '../db';
import { ArtistSchema } from '../db/schemas';

export const createArtist = async (musicId: string, artistName: string): Promise<void> => {
  if (artistName == undefined) return;
  const artistId = sha1(artistName);

  if (artistName == '' || artistId == '') return;
  const artist = new ArtistSchema({
    name: artistName,
    __id: artistId,
    musics: [musicId],
  });
  try {
    await artist.save();
    logger.info('Artist ' + artistName + ' was created');
  } catch (err) {
    await addMusicToArtist(artistId, musicId);
  }
};

const addMusicToArtist = async (artistId: string, musicId: string): Promise<void> => {
  await db.addToArray(ArtistSchema, '__id', artistId, 'musics', musicId);
  logger.info('Adding music ' + musicId + ' to artist ' + artistId);
};
