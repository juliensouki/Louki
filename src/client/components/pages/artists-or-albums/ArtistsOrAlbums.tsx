import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import PlaylistHeader from '../../playlist/PlaylistHeader';
import SearchContainer from '../../playlist/SearchContainer';
import PlaylistBody from '../../playlist/artists-or-albums-playlist-layout/PlaylistBody';

import { Stats } from '../../../store/statistics/Stats';
import LoukiStore from '../../../store/data/LoukiStore';

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
        <PlaylistHeader
          subTitle={this.subTitle}
          title={this.title}
          image={image}
          noStartButton
          stat={this.page == Page.ARTISTS ? Stats.NUMBER_OF_ARTISTS : Stats.NUMBER_OF_ALBUMS}
          statArg={this.page == Page.ARTISTS ? LoukiStore.allArtists.length : LoukiStore.allAlbums.length}
        />
        <SearchContainer />
        <PlaylistBody page={this.page} />
      </div>
    );
  }
}

export default withRouter(ArtistsOrAlbums);
