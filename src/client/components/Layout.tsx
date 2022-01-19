import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import RouteChangeHandler from './utils/navigation/RouteChangeHandler';

import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import TopBar from './layout/topbar/TopBar';
import LeftPanel from './layout/left-panel/LeftPanel';
import MusicBar from './layout/music-bar/MusicBar';
import PlaylistPanel from './layout/playlist-panel/PlaylistPanel';
import AllMusics from './pages/all-musics/AllMusics';
import ArtistsOrAlbums from './pages/artists-or-albums/ArtistsOrAlbums';
import NewPlaylist from './pages/new-playlist/NewPlaylist';
import Playlist from './pages/playlist/Playlist';
import Settings from './pages/settings/Settings';
import Favorites from './pages/favorites/Favorites';
import SpecificArtistOrAlbum from './pages/specific-artist-or-album/SpecificArtistOrAlbum';
import SetupModal from './modals/setup-modal/SetupModal';
import NotificationsHandler from './utils/notifications/NotificationsHandler';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      html: {
        fontSize: '62.5%',
      },
      body: {
        overflowX: 'hidden',
        overflowY: 'hidden',
      },
      '.MuiSnackbarContent-root': {
        color: '#fff',
        fontSize: '1.3rem',
      },
    },
    mainContainer: {
      width: '100%',
      height: 'calc(100vh - 12.5em)',
      [theme.breakpoints.down('sm')]: {
        height: 'calc(100vh - 140px)',
      },
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100vh - 115px)',
      },
    },
  });

interface Props extends WithStyles<typeof styles> {
  setupModal: boolean;
}

@observer
class Layout extends React.Component<Props, NoState> {
  @observable closeSetupModal: boolean = false;

  @action closeModal = () => {
    this.closeSetupModal = true;
  };

  render() {
    const { classes, setupModal } = this.props;

    if (setupModal && !this.closeSetupModal) {
      return <SetupModal open={true} onClose={this.closeModal} />;
    } else {
      return (
        <BrowserRouter>
          <RouteChangeHandler />
          <NotificationsHandler />
          <TopBar />
          <Grid container direction='row' className={classes.mainContainer}>
            <LeftPanel />
            <PlaylistPanel>
              <Switch>
                <Route path={'/all-musics'} component={AllMusics} exact />
                <Route path={'/favorites'} component={Favorites} exact />
                <Route path={'/playlist/:id'} component={Playlist} exact />
                <Route path={'/new-playlist'} component={NewPlaylist} exact />
                <Route path={'/artists'} component={ArtistsOrAlbums} exact />
                <Route path={'/artist/:id'} component={SpecificArtistOrAlbum} exact />
                <Route path={'/albums'} component={ArtistsOrAlbums} exact />
                <Route path={'/album/:id'} component={SpecificArtistOrAlbum} exact />
                <Route path={'/settings'} component={Settings} exact />
                <Redirect to='/all-musics' />
              </Switch>
            </PlaylistPanel>
          </Grid>
          <MusicBar />
        </BrowserRouter>
      );
    }
  }
}

export default withStyles(styles)(Layout);
