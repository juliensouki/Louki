import { Language } from './Languages';

export interface Album {
  title: string;
  __id: string;
  musics: Array<string>;
  author: string;
}

export interface Artist {
  name: string;
  __id: string;
  musics: Array<string>;
}

export interface Playlist {
  name: string;
  picture: string;
  description: string;
  musics: Array<string>;
  createdAt: Date;
  __id: string;
}

export interface Music {
  title: string;
  artist: string;
  album: string;
  duration: number;
  path: string;
  __id: string;
}

export interface User {
  __id: string;

  name: string;
  selected: boolean;
  picture: string;

  musicPaths: Array<string>;
  history: Array<string>;
  favorites: Array<string>;

  settings: AccountSettings;
}

export interface Settings {
  language: Language;
  internetUsage: boolean;
  username: string;
  picture: string;
}

export interface AccountSettings {
  language: Language;
  internetUsage: boolean;
}
