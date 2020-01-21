import { observable, action, computed } from 'mobx';

class CreatePlaylistForm {
  @observable private playlistName: string = '';
  @observable private pictureUrl: string = '';
  @observable private playlistDescription: string = '';

  @action setName = (name: string) => {
    this.playlistName = name;
  };

  @action setPicture = (pictureUrl: string) => {
    this.pictureUrl = pictureUrl;
  };

  @action setDescription = (description: string) => {
    this.playlistDescription = description;
  };

  @computed get name(): string {
    return this.playlistName;
  }

  @computed get picture(): string {
    return this.pictureUrl;
  }

  @computed get description(): string {
    return this.playlistDescription;
  }

  @action send = () => {
    fetch('/createPlaylist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json', // eslint-disable-line
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.playlistName,
        description: this.playlistDescription,
      }),
    });
  };
}

export default new CreatePlaylistForm();
