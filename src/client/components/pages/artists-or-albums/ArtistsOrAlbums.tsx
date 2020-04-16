import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import PlaylistHeader from '../../fragments/playlist/PlaylistHeader';
import SearchContainer from '../../fragments/playlist/SearchContainer';
import PlaylistBody from '../../fragments/playlist-artists-or-albums/PlaylistBody';

import artistsTexts from '../../../lang/pages/artists';
import albumsTexts from '../../../lang/pages/albums';

export enum Page {
  ARTISTS = '/artists',
  ALBUMS = '/albums',
  NOT_DEFINED = '',
}
@observer
class ArtistsOrAlbums extends React.Component<RouteComponentProps, NoState> {
  @observable page: Page = Page.NOT_DEFINED;

  componentDidMount() {
    this.page = this.props.location.pathname;
  }

  componentDidUpdate() {
    this.page = this.props.location.pathname;
  }

  get title(): string {
    return this.page == Page.ARTISTS
      ? artistsTexts.current.playlistHeader.title
      : albumsTexts.current.playlistHeader.title;
  }

  get subTitle(): string {
    return this.page == Page.ARTISTS
      ? artistsTexts.current.playlistHeader.subTitle
      : albumsTexts.current.playlistHeader.subTitle;
  }

  render() {
    const image = this.page == Page.ARTISTS ? '/assets/images/artists.png' : '/assets/images/albums.png';

    return (
      <div style={{ width: '100%' }}>
        <PlaylistHeader subTitle={this.subTitle} title={this.title} image={image} noStartButton />
        <SearchContainer />
        <PlaylistBody page={this.page} />
      </div>
    );
  }
}

export default withRouter(ArtistsOrAlbums);
