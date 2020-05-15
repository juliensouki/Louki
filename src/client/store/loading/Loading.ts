import { observable, computed, action } from 'mobx';
import User from '../data/User';
import SettingsForm from '../forms/SettingsForm';

class Loading {
  @observable everythingLoaded: boolean = false;

  @observable private loadedUser: boolean = false;
  @observable private loadedArtists: boolean = false;
  @observable private loadedAlbums: boolean = false;
  @observable private loadedPlaylists: boolean = false;
  @observable private loadedBookmarks: boolean = false;
  @observable private loadedMusics: boolean = false;

  @action checkThatEverythingHasLoaded = () => {
    if (
      this.loadedUser &&
      this.loadedArtists &&
      this.loadedAlbums &&
      this.loadedPlaylists &&
      this.loadedMusics &&
      this.loadedBookmarks
    ) {
      this.everythingLoaded = true;
    }
  };

  @action userHasLoaded = () => {
    this.loadedUser = true;
    SettingsForm.setUserId(User.id);
    SettingsForm.setUsername(User.name);
    SettingsForm.setSettings(User.settings);
    this.checkThatEverythingHasLoaded();
  };

  @action artistsHaveLoaded = () => {
    this.loadedArtists = true;
    this.checkThatEverythingHasLoaded();
  };

  @action albumsHaveLoaded = () => {
    this.loadedAlbums = true;
    this.checkThatEverythingHasLoaded();
  };

  @action musicsHaveLoaded = () => {
    this.loadedMusics = true;
    this.checkThatEverythingHasLoaded();
  };

  @action playlistsHaveLoaded = () => {
    this.loadedPlaylists = true;
    this.checkThatEverythingHasLoaded();
  };

  @action bookmarksHaveLoaded = () => {
    this.loadedBookmarks = true;
    this.checkThatEverythingHasLoaded();
  };

  @action setEverythingLoaded = (everythingLoaded: boolean) => {
    this.everythingLoaded = everythingLoaded;
  };

  @action reloadApp = () => {
    this.everythingLoaded = false;
  };

  @computed public get loadingIsComplete(): boolean {
    return this.everythingLoaded;
  }
}

export default new Loading();
