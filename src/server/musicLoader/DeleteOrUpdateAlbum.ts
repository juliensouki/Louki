import { io } from '../config';
import logger from '../logger';
import db from '../db';
import { AlbumSchema } from '../db/schemas';
import { Album } from '../../shared/LoukiTypes';
import { UpdateArtistOrAlbumResponse } from '../../shared/SocketIODefinitions';

export const deleteAlbum = (id: string): void => {
  db.deleteFromDocument(AlbumSchema, '__id', id).then(() => {
    logger.info('Deleted album ' + id);
    db.getCollectionContent(AlbumSchema).then(albums => {
      io.sockets.emit('refresh_albums', albums);
    });
  });
};

export const removeMusicFromAlbum = (albumId: string, musicId: string): void => {
  db.removeFromArray(AlbumSchema, '__id', albumId, 'musics', musicId).then((album: Album) => {
    logger.info('Removing song ' + musicId + ' from artist ' + albumId);
    const sendToClient: UpdateArtistOrAlbumResponse = {
      id: albumId,
      data: album,
    };
    io.sockets.emit('udpate_album', sendToClient);
  });
};
