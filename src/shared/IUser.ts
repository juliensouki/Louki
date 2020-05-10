import { Language } from './Languages';

export interface Settings { // eslint-disable-line
  language: Language;
  internetUsage: boolean;
  username: string;
  picture: string;
}

export interface AccountSettings { //eslint-disable-line
  language: Language;
  internetUsage: boolean;
}

export default interface IUser {
  __id: string;

  name: string;
  selected: boolean;
  picture: string;

  musicPaths: Array<string>;
  history: Array<string>;
  favorites: Array<string>;

  settings: AccountSettings;
}
