import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';
import MusicsData from '../../../store/common/MusicsData';
import PlaylistData from '../../../store/common/PlaylistData';

import IPlaylist from '../../../../shared/IPlaylist';
import IMusic from '../../../../shared/IMusic';

@observer
class Playlist extends React.Component<NoProps, NoState> {
  @observable playlist: IPlaylist | null = null;
  @observable musics: Array<IMusic> = [];

  async componentDidMount() {
    const playlistId = this.props.location.pathname.split('/playlist/')[1];

    fetch('/playlist?id=' + playlistId)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.playlist = data;
        PlaylistData.setCurrentPlaylist(this.playlist);
        this.musics = MusicsData.idsToMusics(this.playlist.musics);
      });
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader
          playlist={this.musics}
          playlistId={this.playlist == null ? undefined : this.playlist.__id}
          subTitle='Playlist'
          title={this.playlist != null ? this.playlist.name : ''}
          description={this.playlist != null ? this.playlist.description : ''}
        />
        <SearchContainer />
        <PlaylistBody playlist={this.musics} customPlaylist />
      </div>
    );
  }
}

export default withRouter(Playlist);
