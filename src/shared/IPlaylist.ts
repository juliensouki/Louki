interface IPlaylist {
  name: string;
  picture: string;
  description: string;
  musics: Array<string>;
  createdAt: Date;
  createdBy: number;
  __id: string;
}

export default IPlaylist;
