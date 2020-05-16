import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Music, Artist, Album } from '../../../../shared/LoukiTypes';

import LoukiStore from '../../../store/data/LoukiStore';
import { Stats } from '../../../store/statistics/Stats';

import PlaylistBody from '../../playlist/playlist-layout/PlaylistBody';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistHeader from '../../playlist/PlaylistHeader';

import texts from '../../../lang/pages/specific-artist-or-album';
import { GetArtistOrAlbum, GetArtistOrAlbumResponse } from '../../../requests/ArtistsOrAlbums';

@observer
class SpecificArtistOrAlbum extends React.Component<RouteComponentProps, NoState> {
  @observable artistOrAlbumId: string = '';
  @observable artistOrAlbumName: string = '';
  @observable artistOrAlbum: 'artist' | 'album' | '' = '';
  @observable playlist: Array<Music> | null = null;

  componentDidMount() {
    this.artistOrAlbum = this.props.location.pathname.split('/')[1];
    this.artistOrAlbumId = this.props.location.pathname.split('/' + this.artistOrAlbum + '/')[1];

    GetArtistOrAlbum(this.artistOrAlbum, this.artistOrAlbumId).then((response: GetArtistOrAlbumResponse) => {
      if (response == null) {
        this.props.history.push('/all-music');
      } else {
        const arrayOfIds: Array<string> = response.musics;
        this.artistOrAlbumName = (response as Artist).name || (response as Album).title;
        this.playlist = LoukiStore.idsToMusics(arrayOfIds);
      }
    });
  }

  render() {
    const image = this.artistOrAlbum == 'artist' ? '/assets/images/artists.png' : '/assets/images/albums.png';
    const subTitle = this.artistOrAlbum == 'artist' ? texts.current.artist : texts.current.album;

    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader
          title={this.artistOrAlbumName}
          subTitle={subTitle}
          image={image}
          playlist={this.playlist}
          stat={Stats.TIME_SPENT_LISTENING}
        />
        <SearchContainer />
        <PlaylistBody playlist={this.playlist} canAddToFavorites allSongs />
      </div>
    );
  }
}

export default withRouter(SpecificArtistOrAlbum);
