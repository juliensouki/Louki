import { Language } from './Languages';

export interface AccountSettings { // eslint-disable-line
  language: Language;
  internetUsage: boolean;
  username: string;
  profilePicture: string;
}

export default interface IUser {
  name: string;
  selected: boolean;
  picture: string;
  musicPaths: Array<string>;
  history: Array<string>;
  favorites: Array<string>;
  __id: string;

  settings: AccountSettings;
}
