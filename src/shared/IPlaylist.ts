interface IPlaylist {
  name: string;
  picture: string;
  description: string;
  musics: Array<string>;
  createdAt: Date;
  __id: string;
}

export default IPlaylist;
