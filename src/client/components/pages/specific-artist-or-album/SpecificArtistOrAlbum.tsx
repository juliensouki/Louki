import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Music, Artist, Album } from '../../../../shared/LoukiTypes';
import Notifications, { NotificationType } from '../../../store/features/Notifications';
import { GetArtistOrAlbum, GetArtistOrAlbumResponse } from '../../../requests/ArtistsOrAlbums';
import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';

import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistHeader from '../../playlist/PlaylistHeader';
import PlaylistOptionsItem from '../../utils/options/PlaylistOptionsItem';

import texts from '../../../lang/pages/specific-artist-or-album';
import notifsTexts from '../../../lang/notifications';
import optionsTexts from '../../../lang/options';
import SelectPlaylistModal from '../../modals/SelectPlaylistModal';

@observer
class SpecificArtistOrAlbum extends React.Component<RouteComponentProps, NoState> {
  @observable artistOrAlbumId: string = '';
  @observable artistOrAlbumName: string = '';
  @observable artistOrAlbum: 'artist' | 'album' | '' = '';
  @observable playlist: Array<Music> | null = null;
  @observable openSelectPlaylistModal: boolean = false;
  @observable musicToAddToPlaylist: string = '';

  componentDidMount() {
    this.artistOrAlbum = this.props.location.pathname.split('/')[1];
    this.artistOrAlbumId = this.props.location.pathname.split('/' + this.artistOrAlbum + '/')[1];

    GetArtistOrAlbum(this.artistOrAlbum, this.artistOrAlbumId).then((response: GetArtistOrAlbumResponse) => {
      if (response == null) {
        this.props.history.push('/all-musics');
      } else {
        const arrayOfIds: Array<string> = response.data.musics;
        console.log(LoukiStore.idsToMusics(arrayOfIds));
        this.artistOrAlbumName = (response.data as Artist).name || (response.data as Album).title;
        this.playlist = LoukiStore.idsToMusics(arrayOfIds);
      }
    });
  }

  @action handleAddMusicToPlaylist = (id: string) => {
    this.openSelectPlaylistModal = true;
    this.musicToAddToPlaylist = id;
  };

  @action handleCloseModal = event => {
    event.stopPropagation();
    this.openSelectPlaylistModal = false;
  };

  handleEditMusic = () => {
    Notifications.addNotification(notifsTexts.current.notDeveloped, NotificationType.INFO);
  };

  options = (id: string): Array<JSX.Element> => {
    const T = optionsTexts.current;
    return [
      <PlaylistOptionsItem
        key={0}
        title={T.addToPlaylist}
        handleClick={() => {
          this.handleAddMusicToPlaylist(id);
        }}
      />,
      <PlaylistOptionsItem key={1} title={T.edit} handleClick={this.handleEditMusic} />,
    ];
  };

  render() {
    const image = this.artistOrAlbum == 'artist' ? '/assets/images/artists.png' : '/assets/images/albums.png';
    const subTitle = this.artistOrAlbum == 'artist' ? texts.current.artist : texts.current.album;
    const T = texts.current;

    return (
      <div style={{ width: '100%' }}>
        <SelectPlaylistModal
          open={this.openSelectPlaylistModal}
          handleClose={this.handleCloseModal}
          musicId={this.musicToAddToPlaylist}
        />
        <PlaylistHeader
          title={this.artistOrAlbumName}
          subTitle={subTitle}
          image={image}
          playlist={this.playlist}
          stat={Stats.TIME_SPENT_LISTENING}
        />
        <SearchContainer />
        <PlaylistBody
          playlist={this.playlist}
          emptySettings={{
            ...T.emptyTexts,
            redirectRoute: '/all-musics',
          }}
          addBookmarksEnabled
          options={this.options}
        />
      </div>
    );
  }
}

export default withRouter(SpecificArtistOrAlbum);
