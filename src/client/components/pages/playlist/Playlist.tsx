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
import optionsTexts from '../../../lang/options';
import notifsTexts from '../../../lang/notifications';

@observer
class PlaylistPage extends React.Component<RouteComponentProps & WithSnackbarProps, NoState> {
  @action removeFromPlaylist = (id: string) => {
    const playlistId = LoukiStore.currentPlaylist.__id;
    const T = notifsTexts.current;

    RemoveMusicFromPlaylist(id, playlistId).then((response: RemoveMusicResponse) => {
      LoukiStore.setCurrentPlaylist(response.data);
      MusicPlayer.setCurrentPlaylist(LoukiStore.idsToMusics(response.data.musics));
      const snackbarOptions = { variant: 'success' as any };
      const musicName = LoukiStore.idToMusic(id).title;
      const playlistName = LoukiStore.idToPlaylist(playlistId).name;
      this.props.enqueueSnackbar(T.removedFromPlaylist(musicName, playlistName), snackbarOptions);
    });
  };

  handleEditMusic = () => {
    const snackbarOptions = { variant: 'info' as any };
    this.props.enqueueSnackbar(notifsTexts.current.notDeveloped, snackbarOptions);
  };

  desktopPlaylistOptions = (id: string): Array<JSX.Element> => {
    const T = optionsTexts.current;
    return [
      <PlaylistOptionsItem
        key={0}
        title={T.removeFromPlaylist}
        handleClick={() => {
          this.removeFromPlaylist(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title={T.edit} handleClick={this.handleEditMusic} />,
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
            ...T.emptyTexts,
            redirectRoute: '/all-musics',
          }}
          addBookmarksEnabled
          desktopPlaylistOptions={this.desktopPlaylistOptions}
        />
      </div>
    );
  }
}

export default withSnackbar(withRouter(PlaylistPage));
