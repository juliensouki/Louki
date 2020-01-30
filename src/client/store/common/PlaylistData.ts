import { observable, computed, action } from 'mobx';
import IPlaylist from '../../../shared/IPlaylist';

class PlaylistData {
  @observable private playlist: IPlaylist | null = null;

  @action setCurrentPlaylist(playlist: IPlaylist) {
    this.playlist = playlist;
  }

  @computed get currentPlaylist(): IPlaylist | null {
    return this.playlist;
  }
}

export default new PlaylistData();