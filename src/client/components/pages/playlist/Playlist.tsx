import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import PlaylistOptionsItem from '../../utils/PlaylistOptionsItem';

import { Music, Playlist } from '../../../../shared/LoukiTypes';
import { RemoveMusicFromPlaylist, RemoveMusicResponse } from '../../../requests/Playlists';

import LoukiStore from '../../../store/data/LoukiStore';
import MusicPlayer from '../../../store/features/MusicPlayer';
import { Stats } from '../../../store/statistics/Stats';

import texts from '../../../lang/pages/custom-playlist';
import emptyTexts from '../../../lang/fragments/playlist/playlist-body';

@observer
class PlaylistPage extends React.Component<RouteComponentProps & WithSnackbarProps, NoState> {
  @action removeFromPlaylist = (id: string) => {
    const playlistId = LoukiStore.currentPlaylist.__id;

    RemoveMusicFromPlaylist(id, playlistId).then((response: RemoveMusicResponse) => {
      LoukiStore.setCurrentPlaylist(response);
      MusicPlayer.setCurrentPlaylist(LoukiStore.idsToMusics(response.musics));
      const snackbarOptions = { variant: 'success' as any };
      const musicName = LoukiStore.idToMusic(id).title;
      const playlistName = LoukiStore.idToPlaylist(playlistId).name;
      this.props.enqueueSnackbar(`${musicName} removed from ${playlistName}`, snackbarOptions);
    });
  };

  handleEditMusic = () => {
    const snackbarOptions = { variant: 'info' as any };
    this.props.enqueueSnackbar('This feature has not been developed yet.', snackbarOptions);
  };

  desktopPlaylistOptions = (id: string): Array<JSX.Element> => {
    return [
      <PlaylistOptionsItem
        key={0}
        title='Remove from playlist'
        handleClick={() => {
          this.removeFromPlaylist(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title='Edit music' handleClick={this.handleEditMusic} />,
    ];
  };

  render() {
    const T = texts.current;

    const playlist: Playlist = LoukiStore.currentPlaylist;
    const musics: Array<Music> = playlist != null ? LoukiStore.idsToMusics(playlist.musics) : [];

    const defaultPlaylistImage = '/assets/images/playlist.png';

    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader
          playlist={musics}
          allowOptions
          subTitle={T.playlistHeader.subTitle}
          image={
            playlist == null || !playlist.picture || playlist.picture == '' ? defaultPlaylistImage : playlist.picture
          }
          title={playlist != null ? playlist.name : ''}
          description={playlist != null ? playlist.description : ''}
          stat={Stats.TIME_SPENT_LISTENING}
        />
        <SearchContainer />
        <PlaylistBody
          playlist={musics}
          emptySettings={{
            ...emptyTexts.current.custom,
            redirectRoute: '/settings',
          }}
          addBookmarksEnabled
          desktopPlaylistOptions={this.desktopPlaylistOptions}
        />
      </div>
    );
  }
}

export default withSnackbar(withRouter(PlaylistPage));
