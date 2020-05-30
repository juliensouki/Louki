import { observable, action, computed } from 'mobx';
import { Album, Artist, Music, Playlist } from '../../../shared/LoukiTypes';

import { UpdateArtistOrAlbumResponse } from '../../../shared/SocketIODefinitions';
import socketIOClient from 'socket.io-client';

class LoukiStore {
  @observable private musics: Array<Music> = [];
  @observable private artists: Array<Artist> = [];
  @observable private albums: Array<Album> = [];
  @observable private playlists: Array<Playlist> = [];
  @observable private cPlaylist: Playlist | null = null;
  @observable private isSync: boolean = false;

  @observable socket: SocketIOClient.Socket = null;

  constructor() {
    this.socket = socketIOClient('http://127.0.0.1:3000');

    this.socket.on('refresh_all', this.handleRefreshAll);
    this.socket.on('refresh_musics', this.setMusics);
    this.socket.on('refresh_artists', this.setArtists);
    this.socket.on('refresh_albums', this.setAlbums);

    this.socket.on('update_artist', this.handleUpdateArtist);
    this.socket.on('update_album', this.handleUpdateAlbum);

    this.socket.on('new_music', this.handleNewMusic);
    this.socket.on('new_artist', this.handleNewArtist);
    this.socket.on('new_album', this.handleNewAlbum);

    this.socket.on('sync_start', () => {
      this.setSync(true);
    });
    this.socket.on('sync_end', () => {
      this.setSync(false);
    });
  }

  @action setSync = (sync: boolean) => {
    this.isSync = sync;
  };

  @action handleRefreshAll = (data: any) => {
    this.setMusics(data.musics);
    this.setArtists(data.artists);
    this.setAlbums(data.albums);
  };

  @action setMusics = (musics: Array<Music>) => {
    this.musics = musics;
  };

  @action setArtists = (artists: Array<Artist>) => {
    this.artists = artists;
  };

  @action setAlbums = (albums: Array<Album>) => {
    this.albums = albums;
  };

  @action handleNewArtist = (artist: Artist) => {
    this.artists.push(artist);
  };

  @action handleNewAlbum = (album: Album) => {
    this.albums.push(album);
  };

  @action handleNewMusic = (music: Music) => {
    this.musics.push(music);
  };

  @action handleUpdateArtist = (response: UpdateArtistOrAlbumResponse) => {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].__id == response.id) {
        this.artists[i] = response.data as Artist;
        break;
      }
    }
  };

  @action handleUpdateAlbum = (response: UpdateArtistOrAlbumResponse) => {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].__id == response.id) {
        this.albums[i] = response.data as Album;
        break;
      }
    }
  };

  @action setPlaylists = (playlists: Array<Playlist>) => {
    this.playlists = playlists;
  };

  @action setCurrentPlaylist = (cPlaylist: Playlist) => {
    this.cPlaylist = cPlaylist;
  };

  @computed get currentPlaylist(): Playlist | null {
    return this.cPlaylist;
  }

  @computed get allMusics(): Array<Music> {
    return this.musics;
  }

  @computed get allArtists(): Array<Artist> {
    return this.artists;
  }

  @computed get allAlbums(): Array<Album> {
    return this.albums;
  }

  @computed get allPlaylists(): Array<Playlist> {
    return this.playlists;
  }

  @computed get isSynchronizing(): boolean {
    return this.isSync;
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

  private getMusicFromId = (id: string): Music | null => {
    for (let i = 0; i < this.musics.length; i++) {
      if (this.musics[i].__id == id) return this.musics[i];
    }
    return null;
  };

  private getPlaylistFromId = (id: string): Playlist | null => {
    for (let i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].__id == id) return this.playlists[i];
    }
    return null;
  };

  idsToMusics = (ids: Array<string>): Array<Music> => {
    const result: Array<Music> = [];
    ids.forEach(id => {
      const music = this.getMusicFromId(id);
      if (music) result.push(music);
    });
    return result;
  };

  idToMusic = (id: string): Music => {
    return this.getMusicFromId(id);
  };

  idToPlaylist = (id: string): Playlist => {
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

export default new LoukiStore();
