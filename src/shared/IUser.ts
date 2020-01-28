interface IUser {
  name: string;
  selected: boolean;
  picture: string;
  musicPaths: Array<string>;
  history: Array<string>;
  favorites: Array<string>;
  __id: string;
}

export = IUser;
