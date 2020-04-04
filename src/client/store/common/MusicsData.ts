import { observable, action, computed } from 'mobx';
import IAlbum from '../../../shared/IAlbum';
import IArtist from '../../../shared/IArtist';
import IMusic from '../../../shared/IMusic';
import IPlaylist from '../../../shared/IPlaylist';

class MusicsData {
  @observable private musics: Array<IMusic> = [];
  @observable private artists: Array<IArtist> = [];
  @observable private albums: Array<IAlbum> = [];
  @observable private playlists: Array<IPlaylist> = [];

  @action setMusics = (musics: Array<IMusic>) => {
    this.musics = musics;
  };

  @action setArtists = (artists: Array<IArtist>) => {
    this.artists = artists;
  };

  @action setAlbums = (albums: Array<IAlbum>) => {
    this.albums = albums;
  };

  @action setPlaylists = (playlists: Array<IPlaylist>) => {
    this.playlists = playlists;
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

  @computed get allPlaylists(): Array<IPlaylist> {
    return this.playlists;
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

  private getMusicFromId = (id: string): IMusic | null => {
    for (let i = 0; i < this.musics.length; i++) {
      if (this.musics[i].__id == id) return this.musics[i];
    }
    return null;
  };

  private getPlaylistFromId = (id: string): IPlaylist | null => {
    for (let i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].__id == id) return this.playlists[i];
    }
    return null;
  };

  idsToMusics = (ids: Array<string>): Array<IMusic> => {
    const result: Array<IMusic> = [];
    ids.forEach(id => {
      const music = this.getMusicFromId(id);
      if (music) result.push(music);
      else console.log('Could not add music ' + id + ' in array');
    });
    return result;
  };

  idToMusic = (id: string): IMusic => {
    return this.getMusicFromId(id);
  };

  idToPlaylist = (id: string): IPlaylist => {
    return this.getPlaylistFromId(id);
  };

  totalDuration = (musics: Array<string>): string => {
    let timeInSec = 0;
    musics.forEach(musicId => {
      const music = this.getMusicFromId(musicId);
      if (music != null) timeInSec += music.duration;
    });
    return this.msTosec(timeInSec);
  };
}

export default new MusicsData();
