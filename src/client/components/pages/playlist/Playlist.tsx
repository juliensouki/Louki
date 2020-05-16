import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';

import { Music, Playlist } from '../../../../shared/LoukiTypes';

import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';

import texts from '../../../lang/pages/custom-playlist';
@observer
class PlaylistPage extends React.Component<RouteComponentProps, NoState> {
  render() {
    const T = texts.current;

    const playlist: Playlist = LoukiStore.currentPlaylist;
    const musics: Array<Music> = playlist != null ? LoukiStore.idsToMusics(playlist.musics) : [];

    const defaultPlaylistImage = '/assets/images/playlist.png';

    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader
          playlist={musics}
          playlistId={playlist == null ? undefined : playlist.__id}
          subTitle={T.playlistHeader.subTitle}
          image={
            playlist == null || !playlist.picture || playlist.picture == '' ? defaultPlaylistImage : playlist.picture
          }
          title={playlist != null ? playlist.name : ''}
          description={playlist != null ? playlist.description : ''}
          stat={Stats.TIME_SPENT_LISTENING}
        />
        <SearchContainer />
        <PlaylistBody playlist={musics} customPlaylist />
      </div>
    );
  }
}

export default withRouter(PlaylistPage);
