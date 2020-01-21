import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';
import MusicsData from '../../../store/common/MusicsData';

import IPlaylist from '../../../../shared/IPlaylist';
import IMusic from '../../../../shared/IMusic';

@observer
class Playlist extends React.Component<NoProps, NoState> {
  @observable playlist: IPlaylist | null = null;
  @observable musics: Array<IMusic> = [];

  async componentDidMount() {
    const playlistName = this.props.location.pathname.split('/playlist/')[1];

    fetch('/playlist?name=' + playlistName)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.playlist = data;
        this.musics = MusicsData.idsToMusics(this.playlist.musics);
      });
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader
          playlistId={this.playlist == null ? undefined : this.playlist.__id}
          subTitle='Playlist'
          title={this.playlist != null ? this.playlist.name : 'No name'}
          description={this.playlist != null ? this.playlist.description : 'No description'}
        />
        <SearchContainer />
        <PlaylistBody playlist={this.musics} />
      </div>
    );
  }
}

export default withRouter(Playlist);
