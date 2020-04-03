import { observable, computed, action } from 'mobx';
import IPlaylist from '../../../../shared/IPlaylist';

class CurrentPlaylist {
  @observable private playlist: IPlaylist | null = null;

  @action setPlaylist = (playlist: IPlaylist) => {
    this.playlist = playlist;
  };

  @computed get currentPlaylist(): IPlaylist | null {
    return this.playlist;
  }
}

export default new CurrentPlaylist();
