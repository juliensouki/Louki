import User from '../db/schemas/User';
import Music from '../db/schemas/Music';
import Artist from '../db/schemas/Artist';
import Album from '../db/schemas/Album';
import Playlist from '../db/schemas/Playlist';
import IAlbum from '../../shared/IAlbum';
import IArtist from '../../shared/IArtist';
import filesHandler from '../filesHandler';
import uuid from 'uuid';
import { Mongoose } from 'mongoose';

export default class DataLoader {
  private databaseHandler: any;

  private currentUser: any = null;
  private users: any = null;
  private musics: any = null;
  private playlists: any = null;
  private artists: any = null;
  private albums: any = null;

  private musicsToAdd: Array<Array<string>> | null = null;

  //COUNTERS FOR LOGS
  private addedMusics = 0;
  private deletedMusics = 0;
  private addedArtists = 0;
  private deletedArtists = 0;
  private addedAlbums = 0;
  private deletedAlbums = 0;

  constructor(databaseHandler) {
    this.databaseHandler = databaseHandler;
  }

  get = (field: 'users' | 'musics' | 'playlists' | 'artists' | 'albums' | 'currentUser') => {
    return this[field];
  };

  loadSpecificData = (data: 'users' | 'musics' | 'playlists' | 'artists' | 'albums') => {};

  loadData = (callback: () => void) => {
    const [usersPromise, musicsPromise, playlistsPromise, artistsPromise, albumsPromise] = [
      this.databaseHandler.getCollectionContent(User),
      this.databaseHandler.getCollectionContent(Music),
      this.databaseHandler.getCollectionContent(Playlist),
      this.databaseHandler.getCollectionContent(Artist),
      this.databaseHandler.getCollectionContent(Album),
    ];

    Promise.all([usersPromise, musicsPromise, playlistsPromise, artistsPromise, albumsPromise]).then(values => {
      [this.users, this.musics, this.playlists, this.artists, this.albums] = values;
      this.init(callback);
    });
  };

  init = (callback: () => void) => {
    this.selectCurrentUser();
    const filesArray: Array<Array<string>> = filesHandler.getArrayOfFiles(this.currentUser.musicPaths);
    this.musicsToAdd = this.checkForMusicUpdates(filesArray);
    this.addMusics();
    callback();
  };

  selectCurrentUser = () => {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].selected) {
        this.currentUser = this.users[i];
        break;
      }
    }
  };

  checkIfArtistOrAlbumMustBeDeleted = (array, id: string): number => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].musics.includes(id)) {
        return i;
      }
    }
    return -1;
  };

  removeSongFromArtistOrAlbum = (model, array, index, id) => {
    this.databaseHandler.removeFromArray(model, '__id', array[index].__id, 'musics', id);
  };

  checkForMusicUpdates = (arrayOfPaths: Array<Array<string>>) => {
    if (this.musics) {
      this.musics.forEach(music => {
        if (!arrayOfPaths || !arrayOfPaths.some(row => row.includes(music.path))) {
          this.deleteMusic(music.path);
          const artistIndex = this.checkIfArtistOrAlbumMustBeDeleted(this.artists, music.__id);
          const albumIndex = this.checkIfArtistOrAlbumMustBeDeleted(this.albums, music.__id);
          if (artistIndex != -1 && this.artists[artistIndex].musics.length == 1) {
            this.databaseHandler.deleteFromDocument(Artist, '__id', this.artists[artistIndex].__id);
            this.deletedArtists++;
          } else if (artistIndex != -1) {
            this.removeSongFromArtistOrAlbum(Artist, this.artists, artistIndex, music.__id);
          }
          if (albumIndex != -1 && this.albums[albumIndex].musics.length == 1) {
            this.databaseHandler.deleteFromDocument(Album, '__id', this.albums[albumIndex].__id);
            this.deletedAlbums++;
          } else if (albumIndex != -1 && music.album) {
            this.removeSongFromArtistOrAlbum(Album, this.albums, albumIndex, music.__id);
          }
        } else {
          arrayOfPaths = this.removePathFromArray(arrayOfPaths, music.path);
        }
      });
    }
    return arrayOfPaths;
  };

  deleteMusic = (path: string) => {
    this.deletedMusics++;
    this.databaseHandler.deleteFromDocument(Music, 'path', path);
  };

  removePathFromArray = (arrayOfPaths: Array<Array<string>>, musicPath: string): Array<Array<string>> => {
    for (let i = 0; i < arrayOfPaths.length; i++) {
      const index = arrayOfPaths[i].indexOf(musicPath);
      if (index != -1) {
        arrayOfPaths[i].splice(index, 1);
        arrayOfPaths = arrayOfPaths.filter(function(row) {
          return row.length > 0;
        });
        break;
      }
    }
    return arrayOfPaths;
  };

  private areThereMusicsToAdd = (): boolean => {
    for (let i = 0; i < this.musicsToAdd.length; i++) {
      if (this.musicsToAdd[i] && this.musicsToAdd[i].length > 0) return true;
    }
    return false;
  };

  addMusics = () => {
    if (this.areThereMusicsToAdd()) {
      filesHandler.getMetadataAndAddToDB(this.musicsToAdd[0][0], this.addMusicToDB);
    } else {
      this.showLogs();
      this.musicsToAdd = null;
    }
  };

  createArtist = (musicId, artistName, artistId, albumId): Promise<any> => {
    const params = {
      name: artistName,
      __id: artistId,
      albums: albumId != '' ? [albumId] : [],
      musics: [musicId],
    };
    this.addedArtists++;
    return Artist.create(params);
  };

  createAlbum = (musicsId, albumName, albumId, artistId): Promise<any> => {
    const params = {
      title: albumName,
      __id: albumId,
      author: artistId,
      musics: [musicsId],
    };
    this.addedAlbums++;
    return Album.create(params);
  };

  checkIfArtistOrAlbumExists = (albumOrArtistName: string, arrayToCheck: any): string | null => {
    if (!arrayToCheck || arrayToCheck.length == 0) {
      return null;
    }
    for (let i = 0; i < arrayToCheck.length; i++) {
      if ((arrayToCheck[i].title || arrayToCheck[i].name) == albumOrArtistName) return arrayToCheck[i].__id;
    }
    return null;
  };

  updateArtistOrAlbum = (model, id: string, musicId: string) => {
    return this.databaseHandler.addToArray(model, '__id', id, 'musics', musicId);
  };

  createMusic = values => {
    Music.create(values).then(() => {
      this.addedMusics++;
      if (this.musicsToAdd.length > 0 && this.musicsToAdd[0].length > 0) {
        this.musicsToAdd[0].shift();
        if (this.musicsToAdd && this.musicsToAdd.length != 0 && this.musicsToAdd[0].length == 0) {
          this.musicsToAdd.splice(0, 1);
        }
      }
      this.addMusics();
    });
  };

  addMusicToDB = (values, artist: Array<string>, album: string) => {
    let artistId = this.checkIfArtistOrAlbumExists(artist[0], this.artists);
    let albumId = this.checkIfArtistOrAlbumExists(album, this.albums);
    const promisesArray = [];

    if (artistId == null) {
      artistId = uuid.v4();
      promisesArray.push(this.createArtist(values.__id, artist[0], artistId, 0)); // will soon remomve unused albumId
    } else {
      promisesArray.push(this.updateArtistOrAlbum(Artist, artistId, values.__id));
    }
    if (albumId == null && album != '') {
      albumId = uuid.v4();
      promisesArray.push(this.createAlbum(values.__id, album, albumId, artistId));
    } else {
      promisesArray.push(this.updateArtistOrAlbum(Album, albumId, values.__id));
    }
    values.artist = artistId;
    values.album = albumId;
    Promise.all(promisesArray).then(promisesReturnValues => {
      if (promisesReturnValues[0] != null) {
        this.artists.push(promisesReturnValues[0]);
      }
      if (promisesReturnValues[1] != null) {
        this.albums.push(promisesReturnValues[1]);
      }
      this.createMusic(values);
    });
  };

  showLogs = () => {
    console.log(
      'Updated database :\n\tAdded ' +
        this.addedMusics +
        ' music(s) and deleted ' +
        this.deletedMusics +
        ' music(s)\n\tAdded ' +
        this.addedArtists +
        ' artist(s) and deleted ' +
        this.deletedArtists +
        ' artist(s)\n\tAdded ' +
        this.addedAlbums +
        ' album(s) and deleted ' +
        this.deletedAlbums +
        ' album(s)',
    );
  };
}
