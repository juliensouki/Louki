import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RouteChangeHandler from '../components/utils/RouteChangeHandler';

import { Theme, createStyles, withStyles } from '@material-ui/core/styles';

import TopBar from './fragments/topbar/TopBar';
import LeftPanel from './fragments/left-panel/LeftPanel';
import MusicBar from './fragments/music-bar/MusicBar';
import PlaylistPanel from './fragments/playlist-panel/PlaylistPanel';
import AllMusic from './pages/all-music/AllMusic';
import ArtistsOrAlbums from './pages/artists-or-albums/ArtistsOrAlbums';
import NewPlaylist from './pages/new-playlist/NewPlaylist';
import Playlist from './pages/playlist/Playlist';
import Settings from './pages/settings/Settings';
import Favorites from './pages/favorites/Favorites';
import SpecificArtistOrAlbum from './pages/specific-artist-or-album/SpecificArtistOrAlbum';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        overflowY: 'hidden',
      },
      '.MuiSnackbarContent-root': {
        color: '#fff',
      },
    },
  });
@observer
class Layout extends React.Component<NoProps, NoState> {
  render() {
    return (
      <BrowserRouter>
        <RouteChangeHandler />
        <React.Fragment>
          <TopBar />
          <LeftPanel />
          <MusicBar />
          <PlaylistPanel>
            <Switch>
              <Route path={'/'} component={AllMusic} exact />
              <Route path={'/all-songs'} component={AllMusic} exact />
              <Route path={'/favorites'} component={Favorites} exact />
              <Route path={'/playlist/:id'} component={Playlist} exact />
              <Route path={'/new-playlist'} component={NewPlaylist} exact />
              <Route path={'/artists'} component={ArtistsOrAlbums} exact />
              <Route path={'/artist/:id'} component={SpecificArtistOrAlbum} exact />
              <Route path={'/albums'} component={ArtistsOrAlbums} exact />
              <Route path={'/album/:id'} component={SpecificArtistOrAlbum} exact />
              <Route path={'/settings'} component={Settings} exact />
              <Route component={AllMusic} />
            </Switch>
          </PlaylistPanel>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(Layout);
