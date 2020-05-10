import { UpdateArtistOrAlbumResponse } from '../../shared/SocketIODefinitions';
import IArtist from '../../shared/IArtist';
import IAlbum from '../../shared/IAlbum';

import User from '../db/schemas/User';
import Music from '../db/schemas/Music';
import Artist from '../db/schemas/Artist';
import Album from '../db/schemas/Album';

import fs from 'fs';
import filesHandler from '../filesHandler';
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

  get loggedUser() {
    return this.currentUser;
  }

  checkForObsoleteDataInDB = () => {
    this.databaseHandler.getCollectionContent(Music).then(musics => {
      musics.forEach(music => {
        if (!fs.existsSync(music.path)) {
          this.deleteMusic(music);
        }
      });
    });
  };

  detectDeletedSong = path => {
    this.databaseHandler.findOneInDocument(Music, 'path', path).then(music => {
      if (music && music.length > 0) {
        this.deleteMusic(music[0]);
      }
    });
  };

  unwatchFolder = (folder: string) => {
    console.log('unwatch ' + folder);
    const watcher: chokidar.FSWatcher = this.watchersMap.get(folder);
    if (watcher) {
      watcher.close();
      this.watchersMap.delete(folder);
      fs.readdirSync(folder).forEach(file => {
        this.detectDeletedSong(folder + file);
      });
    }
  };

  watchFolder = (folder: string) => {
    const fileWatcher = chokidar.watch('file', {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    });

    this.watchersMap.set(folder, fileWatcher);
    fileWatcher.add(folder);
    console.log('watching : ' + folder);
    fileWatcher.on('add', newSongPath => {
      console.log('Detected new song');
      this.databaseHandler.findOneInDocument(Music, 'path', newSongPath).then(musics => {
        if (musics.length == 0) {
          filesHandler.getMetadataAndAddToDB(newSongPath, folder, this.checkIfSongMustBeAdded);
        }
      });
    });
    fileWatcher.on('unlink', deletedSongPath => {
      this.detectDeletedSong(deletedSongPath);
    });
  };

  watchUserFolders = () => {
    this.currentUser.musicPaths.forEach(userPath => {
      this.watchFolder(userPath);
    });
  };

  selectCurrentUser = (users: Array<any>) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].selected) {
        return users[i];
      }
      return null;
    }
  };

  checkIfSongMustBeAdded = (values: any, artists: Array<string>, album: string) => {
    this.databaseHandler.findOneInDocument(Music, '__id', values.path).then(musics => {
      if (musics.length == 0) {
        console.log('Creating music : ' + values.path);
        this.addMusic(values, artists[0], album);
      }
    });
  };

  checkIfArtistOrAlbumMustBeDeleted = (array, id: string): number => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].musics.includes(id)) {
        return i;
      }
    }
    return -1;
  };

  deleteArtist = id => {
    this.databaseHandler.deleteFromDocument(Artist, '__id', id).then(() => {
      console.log('Deleted artist ' + id);
      this.databaseHandler.getCollectionContent(Artist).then(artists => {
        this.io.sockets.emit('refresh_artists', artists);
      });
    });
  };

  deleteAlbum = id => {
    this.databaseHandler.deleteFromDocument(Album, '__id', id).then(() => {
      console.log('Deleted album ' + id);
      this.databaseHandler.getCollectionContent(Album).then(albums => {
        this.io.sockets.emit('refresh_albums', albums);
      });
    });
  };

  removeMusicFromArtist = (artistId, musicId) => {
    this.databaseHandler.removeFromArray(Artist, '__id', artistId, 'musics', musicId).then(artists => {
      console.log('Removing song ' + musicId + ' from artist ' + artistId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: artistId,
        data: artists as IArtist,
      };
      this.io.sockets.emit('udpate_artist', sendToClient);
    });
  };

  removeMusicFromAlbum = (albumId, musicId) => {
    this.databaseHandler.removeFromArray(Album, '__id', albumId, 'musics', musicId).then(albums => {
      console.log('Removing song ' + musicId + ' from artist ' + albumId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: albumId,
        data: albums as IAlbum,
      };
      this.io.sockets.emit('udpate_album', sendToClient);
    });
  };

  deleteMusic = async music => {
    this.databaseHandler.deleteFromDocument(Music, '__id', music.__id).then(() => {
      console.log('Deleted music ' + music.title);
      this.databaseHandler.getCollectionContent(Music).then(musics => {
        this.io.sockets.emit('refresh_musics', musics);
      });
      this.databaseHandler.findOneInDocument(Music, 'artist', music.artist).then(musics => {
        if (musics.length == 0) {
          this.deleteArtist(music.artist);
        } else {
          this.removeMusicFromArtist(music.artist, music.__id);
        }
      });
      this.databaseHandler.findOneInDocument(Music, 'artist', music.album).then(musics => {
        if (musics.length == 0) {
          this.deleteAlbum(music.album);
        } else {
          this.removeMusicFromAlbum(music.album, music.__id);
        }
      });
    });
  };

  addMusicToArtist = (artistId, musicId) => {
    this.databaseHandler.addToArray(Artist, '__id', artistId, 'musics', musicId).then(artists => {
      console.log('Adding music ' + musicId + ' to artist ' + artistId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: artistId,
        data: artists as IArtist,
      };
      this.io.sockets.emit('update_artist', sendToClient);
    });
  };

  addMusicToAlbum = (albumId, musicId) => {
    this.databaseHandler.addToArray(Album, '__id', albumId, 'musics', musicId).then(albums => {
      console.log('Adding music ' + musicId + ' to album ' + albumId);
      const sendToClient: UpdateArtistOrAlbumResponse = {
        id: albumId,
        data: albums as IArtist,
      };
      this.io.sockets.emit('udpate_album', sendToClient);
    });
  };

  createMusic = (values, musicId, artistId, albumId) => {
    Music.create({ ...values, __id: musicId, artist: artistId, album: albumId }).then(music => {
      console.log('Added music ' + musicId);
      this.io.sockets.emit('new_music', music);
    });
  };

  addMusic = (values, artistName, albumName) => {
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

    Promise.all([artistPromise, albumPromise]).then(promisesValues => {
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

  createArtist = (musicId, artistName, artistId) => {
    this.databaseHandler.findOneInDocument(Artist, '__id', artistId).then(artists => {
      if (artists.length == 0 && artistName != '' && artistId != '') {
        const artist = new Artist({
          name: artistName,
          __id: artistId,
          albums: [],
          musics: [musicId],
        });
        artist.save((err, artist) => {
          if (!err) {
            console.log('Artist ' + artistName + ' was created');
            this.io.sockets.emit('new_artist', artist);
          } else {
            this.addMusicToArtist(artistId, musicId);
          }
        });
      }
    });
  };

  createAlbum = (musicId, albumName, albumId, artistId): void => {
    this.databaseHandler.findOneInDocument(Album, '__id', albumId).then(albums => {
      if (albums.length == 0 && albumName != '' && albumId != '') {
        const artist = new Album({
          title: albumName,
          author: artistId,
          __id: albumId,
          musics: [musicId],
        });
        artist.save((err, album) => {
          if (!err) {
            console.log('Album ' + albumName + ' was created');
            this.io.sockets.emit('new_album', album);
          } else {
            this.addMusicToAlbum(artistId, musicId);
          }
        });
      }
    });
  };
}
