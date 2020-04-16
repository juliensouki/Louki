import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import IMusic from '../../../../shared/IMusic';
import MusicsData from '../../../store/common/MusicsData';
import PlaylistBody from '../../fragments/playlist/PlaylistBody';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';

import texts from '../../../lang/pages/specific-artist-or-album';

@observer
class SpecificArtistOrAlbum extends React.Component<RouteComponentProps, NoState> {
  @observable artistOrAlbumId: string = '';
  @observable artistOrAlbumName: string = '';
  @observable artistOrAlbum: 'artist' | 'album' | '' = '';
  @observable playlist: Array<IMusic> | null = null;

  componentDidMount() {
    this.artistOrAlbum = this.props.location.pathname.split('/')[1];
    this.artistOrAlbumId = this.props.location.pathname.split('/' + this.artistOrAlbum + '/')[1];

    fetch('/' + this.artistOrAlbum + '?id=' + this.artistOrAlbumId)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const arrayOfIds: Array<string> = data.musics;
        this.artistOrAlbumName = this.artistOrAlbum == 'artist' ? data.name : data.title;
        this.playlist = MusicsData.idsToMusics(arrayOfIds);
      });
  }

  render() {
    const image = this.artistOrAlbum == 'artist' ? '/assets/images/artists.png' : '/assets/images/albums.png';
    const subTitle = this.artistOrAlbum == 'artist' ? texts.current.artist : texts.current.album;

    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader title={this.artistOrAlbumName} subTitle={subTitle} description='' image={image} />
        <SearchContainer />
        <PlaylistBody playlist={this.playlist} canAddToFavorites allSongs />
      </div>
    );
  }
}

export default withRouter(SpecificArtistOrAlbum);
