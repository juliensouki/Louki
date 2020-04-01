import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';

import IMusic from '../../../../shared/IMusic';
import IPlaylist from '../../../../shared/IPlaylist';

import CurrentPlaylist from '../../../store/fragments/playlist/CurrentPlaylist';
import MusicsData from '../../../store/common/MusicsData';
@observer
class Playlist extends React.Component<RouteComponentProps, NoState> {
  render() {
    const playlist: IPlaylist = CurrentPlaylist.currentPlaylist;
    const musics: Array<IMusic> = playlist != null ? MusicsData.idsToMusics(playlist.musics) : [];

    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader
          playlist={musics}
          playlistId={playlist == null ? undefined : playlist.__id}
          subTitle='Playlist'
          title={playlist != null ? playlist.name : ''}
          description={playlist != null ? playlist.description : ''}
        />
        <SearchContainer />
        <PlaylistBody playlist={musics} customPlaylist />
      </div>
    );
  }
}

export default withRouter(Playlist);
