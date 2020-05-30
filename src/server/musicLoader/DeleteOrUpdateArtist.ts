import { io } from '../config';
import logger from '../logger';
import db from '../db';
import { ArtistSchema } from '../db/schemas';
import { Artist } from '../../shared/LoukiTypes';
import { UpdateArtistOrAlbumResponse } from '../../shared/SocketIODefinitions';

export const deleteArtist = (id: string): void => {
  db.deleteFromDocument(ArtistSchema, '__id', id).then(() => {
    logger.info('Deleted artist ' + id);
    db.getCollectionContent(ArtistSchema).then(artists => {
      io.sockets.emit('refresh_artists', artists);
    });
  });
};

export const removeMusicFromArtist = (artistId: string, musicId: string): void => {
  db.removeFromArray(ArtistSchema, '__id', artistId, 'musics', musicId).then(artists => {
    logger.info('Removing song ' + musicId + ' from artist ' + artistId);
    const sendToClient: UpdateArtistOrAlbumResponse = {
      id: artistId,
      data: artists as Artist,
    };
    io.sockets.emit('udpate_artist', sendToClient);
  });
};
