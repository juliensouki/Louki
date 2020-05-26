import { Express, Router } from 'express';
import { pagesRouter } from '../config/pages-router';

import { UpdateArtistOrAlbumResponse } from '../../shared/SocketIODefinitions';
import { Artist, Album, User, Music } from '../../shared/LoukiTypes';

import UserSchema from '../db/schemas/UserSchema';
import MusicSchema from '../db/schemas/MusicSchema';
import ArtistSchema from '../db/schemas/ArtistSchema';
import AlbumSchema from '../db/schemas/AlbumSchema';

import filesReader from '../filesReader';
import logger from '../logger';

import fs from 'fs';
import uuid from 'uuid';
import sha1 from 'sha1';
import chokidar from 'chokidar';
import { supportedAudioFormats } from '../config/config';

export default class DataLoader {
  private databaseHandler: any;
  private io: any;
  private watchersMap: any = new Map<string, chokidar.FSWatcher>();
  private app: Express;

  private currentUser: any = null;

  constructor(databaseHandler, io, app) {
    this.databaseHandler = databaseHandler;
    this.io = io;
    this.app = app;
  }

  addMusicRoute = (music: Music) => {
    this.app.get('/api/v1/music/' + music.__id, (_, res) => {
      res.sendFile(music.path);
    });
  };

  loadData = (callback: (router: Router) => void) => {
    this.databaseHandler.getCollectionContent(UserSchema).then(users => {
      this.currentUser = this.selectCurrentUser(users);
      if (this.currentUser) {
        this.checkForObsoleteDataInDB();
        this.watchUserFolders();
      }
      callback(pagesRouter(this.databaseHandler));
    });
  };

  checkForObsoleteDataInDB = (): void => {
    this.databaseHandler.getCollectionContent(MusicSchema).then(musics => {
      musics.forEach(music => {
        if (!fs.existsSync(music.path)) {
          this.deleteMusic(music);
        }
      });
    });
  };

  detectDeletedSong = (path: string): void => {
    this.databaseHandler.findOneInDocument(MusicSchema, 'path', path).then(music => {
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

  buildWatchArray = (folder: string): Array<string> => {
    const array: Array<string> = [];
    supportedAudioFormats.forEach(extension => {
      array.push(`${folder}**/*.${extension}`);
    });
    return array;
  };

  watchFolder = (folder: string): void => {
    const fileWatcher = chokidar.watch('file', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    this.watchersMap.set(folder, fileWatcher);
    fileWatcher.add(this.buildWatchArray(folder));
    logger.info('watching : ' + folder);
    fileWatcher.on('add', (newSongPath: string) => {
      logger.info('Detected new song');
      this.databaseHandler.findOneInDocument(MusicSchema, 'path', newSongPath).then((musics: Array<Music>) => {
        if (musics.length == 0) {
          filesReader.getMetadataAndAddToDB(newSongPath, folder, this.checkIfSongMustBeAdded);
        } else {
          this.addMusicRoute(musics[0]);
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

  selectCurrentUser = (users: Array<any>): User | null => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].selected) {
        return users[i];
      }
      return null;
    }
  };

  checkIfSongMustBeAdded = (values: any, artists: Array<string>, album: string): void => {
    this.databaseHandler.findOneInDocument(MusicSchema, '__id', values.path).then(musics => {
      if (musics.length == 0) {
        logger.info('Creating music : ' + values.path);
        this.addMusic(values, artists[0], album);
      }
    });
  };

  checkIfArtistOrAlbumMustBeDeleted = (array: Array<Artist | Album>, id: string): number => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].musics.includes(id)) {
        return i;
      }
    }
    return -1;
  };

  deleteArtist = (id: string): void => {
    this.databaseHandler.deleteFromDocument(ArtistSchema, '__id', id).then(() => {
      logger.info('Deleted artist ' + id);
      this.databaseHandler.getCollectionContent(ArtistSchema).then(artists => {
        this.io.sockets.emit('refresh_artists', artists);
      });
    });
  };

  deleteAlbum = (id: string): void => {
    this.databaseHandler.deleteFromDocument(AlbumSchema, '__id', id).then(() => {
      logger.info('Deleted album ' + id);
      this.databaseHandler.getCollectionContent(AlbumSchema).then(albums => {
        this.io.sockets.emit('refresh_albums', albums);
      });
    });
  };

  removeMusicFromArtist = (artistId: string, musicId: string): void => {
    this.databaseHandler.removeFromArray(ArtistSchema, '__id', artistId, 'musics', musicId).then(artists => {
      logger.info('Removing song ' + musicId + ' from artist ' + artistId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: artistId,
        data: artists as Artist,
      };
      this.io.sockets.emit('udpate_artist', sendToClient);
    });
  };

  removeMusicFromAlbum = (albumId: string, musicId: string): void => {
    this.databaseHandler.removeFromArray(AlbumSchema, '__id', albumId, 'musics', musicId).then((album: Album) => {
      logger.info('Removing song ' + musicId + ' from artist ' + albumId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: albumId,
        data: album,
      };
      this.io.sockets.emit('udpate_album', sendToClient);
    });
  };

  deleteMusic = async (music: Music) => {
    this.databaseHandler.deleteFromDocument(MusicSchema, '__id', music.__id).then(() => {
      logger.info('Deleted music ' + music.title);
      this.databaseHandler.getCollectionContent(MusicSchema).then((musics: Array<Music>) => {
        this.io.sockets.emit('refresh_musics', musics);
      });
      this.databaseHandler.findOneInDocument(MusicSchema, 'artist', music.artist).then((musics: Array<Music>) => {
        if (musics.length == 0) {
          this.deleteArtist(music.artist);
        } else {
          this.removeMusicFromArtist(music.artist, music.__id);
        }
      });
      this.databaseHandler.findOneInDocument(MusicSchema, 'artist', music.album).then((musics: Array<Music>) => {
        if (musics.length == 0) {
          this.deleteAlbum(music.album);
        } else {
          this.removeMusicFromAlbum(music.album, music.__id);
        }
      });
    });
  };

  addMusicToArtist = (artistId: string, musicId: string): void => {
    this.databaseHandler.addToArray(ArtistSchema, '__id', artistId, 'musics', musicId).then(artists => {
      logger.info('Adding music ' + musicId + ' to artist ' + artistId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: artistId,
        data: artists as Artist,
      };
      this.io.sockets.emit('update_artist', sendToClient);
    });
  };

  addMusicToAlbum = (albumId: string, musicId: string): void => {
    this.databaseHandler.addToArray(AlbumSchema, '__id', albumId, 'musics', musicId).then(albums => {
      logger.info('Adding music ' + musicId + ' to album ' + albumId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: albumId,
        data: albums as Artist,
      };
      this.io.sockets.emit('udpate_album', sendToClient);
    });
  };

  createMusic = (values: any, musicId: string, artistId: string, albumId: string): void => {
    MusicSchema.create({ ...values, __id: musicId, artist: artistId, album: albumId }).then((music: Music) => {
      logger.info('Added music ' + musicId);
      this.addMusicRoute(music);
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

    const artistPromise = this.databaseHandler.findOneInDocument(ArtistSchema, '__id', artistId);
    const albumPromise = this.databaseHandler.findOneInDocument(AlbumSchema, '__id', albumId);

    Promise.all([artistPromise, albumPromise]).then((promisesValues: Array<Array<Artist | Album>>) => {
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
    this.databaseHandler.findOneInDocument(ArtistSchema, '__id', artistId).then((artists: Array<Artist>) => {
      if (artists.length == 0 && artistName != '' && artistId != '') {
        const artist = new ArtistSchema({
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
    this.databaseHandler.findOneInDocument(AlbumSchema, '__id', albumId).then((albums: Array<Album>) => {
      if (albums.length == 0 && albumName != '' && albumId != '') {
        const artist = new AlbumSchema({
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
