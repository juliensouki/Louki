import { observable, computed, action } from 'mobx';

class CurrentPlaylist {
  @observable private playlist: string | null = null;

  @action setPlaylist = (value: string | null): void => {
    this.playlist = value;
  };

  @computed get currentPlaylist(): string {
    return this.playlist;
  };
}

export default new CurrentPlaylist();
