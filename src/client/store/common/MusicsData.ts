import { observable, action, computed } from 'mobx';
import IAlbum from '../../../shared/IAlbum';
import IArtist from '../../../shared/IArtist';
import IMusic from '../../../shared/IMusic';

class MusicsData {
  @observable private musics: Array<IMusic> = [];
  @observable private artists: Array<IArtist> = [];
  @observable private albums: Array<IAlbum> = [];

  @action setMusics = (musics: Array<IMusic>) => {
    this.musics = musics;
  };

  @action setArtists = (artists: Array<IArtist>) => {
    this.artists = artists;
  };

  @action setAlbums = (albums: Array<IAlbum>) => {
    this.albums = albums;
  };

  @computed get allMusics(): Array<IMusic> {
    return this.musics;
  }

  @computed get allArtists(): Array<IArtist> {
    return this.artists;
  }

  @computed get allAlbums(): Array<IAlbum> {
    return this.albums;
  }

  msTosec = (seconds: number): string => {
    const format = val => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    if (hours >= 1) return [hours, minutes, seconds % 60].map(format).join(':');
    return [minutes, seconds % 60].map(format).join(':');
  };

  getAlbumNameById = (id: string): string => {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].__id == id) return this.albums[i].title;
    }
    return '';
  };

  getArtistNameById = (id: string): string => {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].__id == id) return this.artists[i].name;
    }
    return '';
  };
}

export default new MusicsData();
