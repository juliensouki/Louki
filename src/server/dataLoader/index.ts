import User from '../db/schemas/User';
import Music from '../db/schemas/Music';
import Artist from '../db/schemas/Artist';
import Playlist from '../db/schemas/Playlist';
import Album from '../db/schemas/Album';
import filesHandler from '../filesHandler';
import uuid from 'uuid';

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

  constructor(databaseHandler) {
    this.databaseHandler = databaseHandler;
  }

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
      callback();
    });
  };

  init = () => {
    this.selectCurrentUser();
    this.checkForUpdatesInDB();
  };

  selectCurrentUser = () => {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].selected) {
        this.currentUser = this.users[i];
        break;
      }
    }
  };

  deleteMusic = (path: string) => {
    this.deletedMusics++;
    this.databaseHandler.deleteFromDocument(Music, 'path', path);
  };

  updateNumberOfAddedSongs = (array: Array<Array<string>>): void => {
    array.forEach(row => {
      this.addedMusics += row.length;
    });
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

  checkAlbumAndArtist = music => {
    const albumPromise = this.databaseHandler.findOneInDocument(Album, '__id', music.album);
    const artistPromise = this.databaseHandler.findOneInDocument(Artist, '__id', music.artist);

    Promise.all([albumPromise, artistPromise]).then(values => {
      const album = values[0][0];
      const artist = values[1][0];

      if (album && album.musics.length == 1) {
        this.databaseHandler.deleteFromDocument(Album, '__id', album.__id);
      } else if (album) {
        album.musics = album.musics.filter(albumMusic => albumMusic !== music.__id);
        this.databaseHandler.updateDocument(Album, album._id, 'musics', album.musics);
      }
      if (artist && artist.musics.length == 1) {
        this.databaseHandler.deleteFromDocument(Artist, '__id', artist.__id);
      } else if (artist) {
        artist.musics = artist.musics.filter(artistMusic => artistMusic !== music.__id);
        this.databaseHandler.updateDocument(Artist, artist._id, 'musics', artist.musics);
      }
    });
  };

  checkForMusicUpdates = (arrayOfPaths: Array<Array<string>>) => {
    if (this.musics) {
      this.musics.forEach(music => {
        if (!arrayOfPaths || !arrayOfPaths.some(row => row.includes(music.path))) {
          this.deleteMusic(music.path);
          this.checkAlbumAndArtist(music);
        } else {
          arrayOfPaths = this.removePathFromArray(arrayOfPaths, music.path);
        }
      });
    }
    this.updateNumberOfAddedSongs(arrayOfPaths);
    return arrayOfPaths;
  };

  checkIfArtistOrAlbumExists = (albumOrArtistName: string, arrayToCheck: any): string => {
    if (!arrayToCheck || arrayToCheck.length == 0) {
      return '';
    }
    for (let i = 0; i < arrayToCheck.length; i++) {
      if ((arrayToCheck[i].title || arrayToCheck[i].name) == albumOrArtistName) return arrayToCheck[i].__id;
    }
    return '';
  };

  createArtist = (values, artistName, artistId, albumId) => {
    const params = {
      name: artistName,
      __id: artistId,
      albums: albumId != '' ? [albumId] : [],
      musics: [values.__id],
    };
    Artist.create(params);
  };

  createAlbum = (values, albumName, albumId, artistId) => {
    const params = {
      title: albumName,
      __id: albumId,
      artist: artistId,
      musics: [values.__id],
    };
    Album.create(params);
  };

  updateArtistOrAlbum = (model, id: string, musicId: string) => {
    const resultPromise = this.databaseHandler.findOneInDocument(model, '__id', id);
    resultPromise.then(result => {
      const albumOrArtist = JSON.parse(JSON.stringify(result[0]));
      albumOrArtist.musics.push(musicId);
      this.databaseHandler.updateDocument(model, result[0]._id, 'musics', albumOrArtist.musics);
    });
  };

  addMusicToDB = (values, artists: Array<string>, album: string) => {
    let createAlbum: boolean = false;
    let albumId: string = '';
    let artistId: string = '';

    if (album) {
      albumId = this.checkIfArtistOrAlbumExists(album, this.albums);
      if (albumId == '') {
        albumId = uuid.v4();
        createAlbum = true;
      } else {
        this.updateArtistOrAlbum(Album, albumId, values.__id);
      }
    }
    artistId = this.checkIfArtistOrAlbumExists(artists[0], this.artists);
    if (artistId == '') {
      artistId = uuid.v4();
      this.createArtist(values, artists[0], artistId, albumId);
    } else {
      this.updateArtistOrAlbum(Artist, artistId, values.__id);
    }
    if (createAlbum) this.createAlbum(values, album, albumId, artistId);
    values.album = albumId != '' ? albumId : '';
    values.artist = artistId;
    Music.create(values).then(() => {
      this.loadData(this.updateMusicsToAdd);
    });
  };

  updateMusicsToAdd = () => {
    if (this.musicsToAdd && this.musicsToAdd[0].length > 0) {
      this.musicsToAdd[0].splice(0, 1);
      this.addMusics();
    }
  };

  addMusics = () => {
    if (this.musicsToAdd && this.musicsToAdd.length != 0 && this.musicsToAdd[0].length == 0) {
      this.musicsToAdd.splice(0, 1);
    }
    if (this.musicsToAdd && this.musicsToAdd.length != 0) {
      filesHandler.getMetadataAndAddToDB(this.musicsToAdd[0][0], this.addMusicToDB);
    } else {
      this.musicsToAdd = null;
      this.showLogs();
    }
  };

  checkForUpdatesInDB = () => {
    const filesArray: Array<Array<string>> = filesHandler.getArrayOfFiles(this.currentUser.musicPaths);
    this.musicsToAdd = this.checkForMusicUpdates(filesArray);

    this.addMusics();
  };

  showLogs = () => {
    console.log(
      'Updated database (added ' + this.addedMusics + ' musics and deleted ' + this.deletedMusics + ' musics)',
    );
  };
}
