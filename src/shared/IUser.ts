interface IUser {
  name: string;
  selected: boolean;
  picture: string;
  musicPaths: Array<string>;
  history: Array<number>;
  favorites: Array<number>;
}

export = IUser;
