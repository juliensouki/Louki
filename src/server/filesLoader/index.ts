import { UpdateArtistOrAlbumResponse } from '../../shared/SocketIODefinitions';
import IArtist from '../../shared/IArtist';
import IAlbum from '../../shared/IAlbum';
import IUser from '../../shared/IUser';
import IMusic from '../../shared/IMusic';

import User from '../db/schemas/User';
import Music from '../db/schemas/Music';
import Artist from '../db/schemas/Artist';
import Album from '../db/schemas/Album';

import filesReader from '../filesReader';
import logger from '../logger';

import fs from 'fs';
import uuid from 'uuid';
import sha1 from 'sha1';
import chokidar from 'chokidar';

export default class DataLoader {
  private databaseHandler: any;
  private io: any;
  private watchersMap: any = new Map<string, chokidar.FSWatcher>();

  private currentUser: any = null;

  constructor(databaseHandler, io) {
    this.databaseHandler = databaseHandler;
    this.io = io;
  }

  loadData = (callback: () => void) => {
    this.databaseHandler.getCollectionContent(User).then(users => {
      this.currentUser = this.selectCurrentUser(users);
      if (this.currentUser) {
        this.checkForObsoleteDataInDB();
        this.watchUserFolders();
      }
      callback();
    });
  };

  checkForObsoleteDataInDB = (): void => {
    this.databaseHandler.getCollectionContent(Music).then(musics => {
      musics.forEach(music => {
        if (!fs.existsSync(music.path)) {
          this.deleteMusic(music);
        }
      });
    });
  };

  detectDeletedSong = (path: string): void => {
    this.databaseHandler.findOneInDocument(Music, 'path', path).then(music => {
      if (music && music.length > 0) {
        this.deleteMusic(music[0]);
      }
    });
  };

  unwatchFolder = (folder: string): void => {
    logger.info('unwatch ' + folder);
    const watcher: chokidar.FSWatcher = this.watchersMap.get(folder);
    if (watcher) {
      watcher.close();
      this.watchersMap.delete(folder);
      fs.readdirSync(folder).forEach(file => {
        this.detectDeletedSong(folder + file);
      });
    }
  };

  watchFolder = (folder: string): void => {
    const fileWatcher = chokidar.watch('file', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    this.watchersMap.set(folder, fileWatcher);
    fileWatcher.add(folder);
    logger.info('watching : ' + folder);
    fileWatcher.on('add', (newSongPath: string) => {
      logger.info('Detected new song');
      this.databaseHandler.findOneInDocument(Music, 'path', newSongPath).then(musics => {
        if (musics.length == 0) {
          filesReader.getMetadataAndAddToDB(newSongPath, folder, this.checkIfSongMustBeAdded);
        }
      });
    });
    fileWatcher.on('unlink', (deletedSongPath: string) => {
      this.detectDeletedSong(deletedSongPath);
    });
  };

  watchUserFolders = (): void => {
    this.currentUser.musicPaths.forEach((userPath: string) => {
      this.watchFolder(userPath);
    });
  };

  selectCurrentUser = (users: Array<any>): IUser | null => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].selected) {
        return users[i];
      }
      return null;
    }
  };

  checkIfSongMustBeAdded = (values: any, artists: Array<string>, album: string): void => {
    this.databaseHandler.findOneInDocument(Music, '__id', values.path).then(musics => {
      if (musics.length == 0) {
        logger.info('Creating music : ' + values.path);
        this.addMusic(values, artists[0], album);
      }
    });
  };

  checkIfArtistOrAlbumMustBeDeleted = (array: Array<IArtist | IAlbum>, id: string): number => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].musics.includes(id)) {
        return i;
      }
    }
    return -1;
  };

  deleteArtist = (id: string): void => {
    this.databaseHandler.deleteFromDocument(Artist, '__id', id).then(() => {
      logger.info('Deleted artist ' + id);
      this.databaseHandler.getCollectionContent(Artist).then(artists => {
        this.io.sockets.emit('refresh_artists', artists);
      });
    });
  };

  deleteAlbum = (id: string): void => {
    this.databaseHandler.deleteFromDocument(Album, '__id', id).then(() => {
      logger.info('Deleted album ' + id);
      this.databaseHandler.getCollectionContent(Album).then(albums => {
        this.io.sockets.emit('refresh_albums', albums);
      });
    });
  };

  removeMusicFromArtist = (artistId: string, musicId: string): void => {
    this.databaseHandler.removeFromArray(Artist, '__id', artistId, 'musics', musicId).then(artists => {
      logger.info('Removing song ' + musicId + ' from artist ' + artistId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: artistId,
        data: artists as IArtist,
      };
      this.io.sockets.emit('udpate_artist', sendToClient);
    });
  };

  removeMusicFromAlbum = (albumId: string, musicId: string): void => {
    this.databaseHandler.removeFromArray(Album, '__id', albumId, 'musics', musicId).then((album: IAlbum) => {
      logger.info('Removing song ' + musicId + ' from artist ' + albumId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: albumId,
        data: album,
      };
      this.io.sockets.emit('udpate_album', sendToClient);
    });
  };

  deleteMusic = async (music: IMusic) => {
    this.databaseHandler.deleteFromDocument(Music, '__id', music.__id).then(() => {
      logger.info('Deleted music ' + music.title);
      this.databaseHandler.getCollectionContent(Music).then((musics: Array<IMusic>) => {
        this.io.sockets.emit('refresh_musics', musics);
      });
      this.databaseHandler.findOneInDocument(Music, 'artist', music.artist).then((musics: Array<IMusic>) => {
        if (musics.length == 0) {
          this.deleteArtist(music.artist);
        } else {
          this.removeMusicFromArtist(music.artist, music.__id);
        }
      });
      this.databaseHandler.findOneInDocument(Music, 'artist', music.album).then((musics: Array<IMusic>) => {
        if (musics.length == 0) {
          this.deleteAlbum(music.album);
        } else {
          this.removeMusicFromAlbum(music.album, music.__id);
        }
      });
    });
  };

  addMusicToArtist = (artistId: string, musicId: string): void => {
    this.databaseHandler.addToArray(Artist, '__id', artistId, 'musics', musicId).then(artists => {
      logger.info('Adding music ' + musicId + ' to artist ' + artistId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: artistId,
        data: artists as IArtist,
      };
      this.io.sockets.emit('update_artist', sendToClient);
    });
  };

  addMusicToAlbum = (albumId: string, musicId: string): void => {
    this.databaseHandler.addToArray(Album, '__id', albumId, 'musics', musicId).then(albums => {
      logger.info('Adding music ' + musicId + ' to album ' + albumId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: albumId,
        data: albums as IArtist,
      };
      this.io.sockets.emit('udpate_album', sendToClient);
    });
  };

  createMusic = (values: any, musicId: string, artistId: string, albumId: string): void => {
    Music.create({ ...values, __id: musicId, artist: artistId, album: albumId }).then((music: IMusic) => {
      logger.info('Added music ' + musicId);
      this.io.sockets.emit('new_music', music);
    });
  };

  addMusic = (values: any, artistName: string, albumName: string): void => {
    if (artistName == undefined) {
      artistName = '';
    }
    if (albumName == undefined) {
      albumName = '';
    }
    const artistId = artistName == undefined ? '' : sha1(artistName);
    const albumId = albumName == undefined ? '' : sha1(albumName);
    const musicId = uuid.v4();

    const artistPromise = this.databaseHandler.findOneInDocument(Artist, '__id', artistId);
    const albumPromise = this.databaseHandler.findOneInDocument(Album, '__id', albumId);

    Promise.all([artistPromise, albumPromise]).then((promisesValues: Array<Array<IArtist | IAlbum>>) => {
      if (promisesValues[0].length > 0) {
        this.addMusicToArtist(artistId, values.__id);
      } else {
        this.createArtist(musicId, artistName, artistId);
      }
      if (promisesValues[1].length > 0) {
        this.addMusicToAlbum(albumId, values.__id);
      } else {
        this.createAlbum(musicId, albumName, albumId, artistId);
      }
    });

    this.createMusic(values, musicId, artistId, albumName != '' ? albumId : '');
  };

  createArtist = (musicId: string, artistName: string, artistId: string): void => {
    this.databaseHandler.findOneInDocument(Artist, '__id', artistId).then((artists: Array<IArtist>) => {
      if (artists.length == 0 && artistName != '' && artistId != '') {
        const artist = new Artist({
          name: artistName,
          __id: artistId,
          musics: [musicId],
        });
        artist.save((err, artist) => {
          if (!err) {
            logger.info('Artist ' + artistName + ' was created');
            this.io.sockets.emit('new_artist', artist);
          } else {
            this.addMusicToArtist(artistId, musicId);
          }
        });
      }
    });
  };

  createAlbum = (musicId: string, albumName: string, albumId: string, artistId: string): void => {
    this.databaseHandler.findOneInDocument(Album, '__id', albumId).then((albums: Array<IAlbum>) => {
      if (albums.length == 0 && albumName != '' && albumId != '') {
        const artist = new Album({
          title: albumName,
          author: artistId,
          __id: albumId,
          musics: [musicId],
        });
        artist.save((err, album) => {
          if (!err) {
            logger.info('Album ' + albumName + ' was created');
            this.io.sockets.emit('new_album', album);
          } else {
            this.addMusicToAlbum(artistId, musicId);
          }
        });
      }
    });
  };
}
