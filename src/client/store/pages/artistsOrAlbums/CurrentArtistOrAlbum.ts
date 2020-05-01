import { observable, computed, action } from 'mobx';

class CurrentArtistOrAlbum {
  @observable private artistMode: boolean = false;

  @action setArtist = (value: boolean): void => {
    this.artistMode = value;
  };

  @computed get showArtist(): boolean {
    return this.artistMode;
  }
}

export default new CurrentArtistOrAlbum();
