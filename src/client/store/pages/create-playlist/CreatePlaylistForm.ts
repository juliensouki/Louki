import { observable, action, computed } from 'mobx';
import MusicsData from '../../common/MusicsData';
import { useHistory } from 'react-router';

class CreatePlaylistForm {
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

  @action send = () => {
    fetch('/createPlaylist', {
      method: 'POST',
      body: this.file[0],
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        MusicsData.setPlaylists(data);
        const history = useHistory();
        history.push('/all-music');
      });
  };
}

export default new CreatePlaylistForm();
