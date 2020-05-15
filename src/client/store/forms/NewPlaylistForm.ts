import { observable, action, computed } from 'mobx';
import LoukiStore from '../data/LoukiStore';
import { useHistory } from 'react-router';

class NewPlaylistForm {
  @observable private playlistName: string = '';
  @observable private url: string = '';
  @observable private file: File | null = null;
  @observable private playlistDescription: string = '';

  @action setName = (name: string) => {
    this.playlistName = name;
  };

  @action setPictureUrl = (url: string) => {
    this.url = url;
  };

  @action setPicture = (file: File | null) => {
    this.file = file;
  };

  @action setDescription = (description: string) => {
    this.playlistDescription = description;
  };

  @computed get name(): string {
    return this.playlistName;
  }

  @computed get pictureUrl(): string {
    return this.url;
  }

  @computed get pictureFile(): File | null {
    return this.file;
  }

  @computed get description(): string {
    return this.playlistDescription;
  }
}

export default new NewPlaylistForm();
