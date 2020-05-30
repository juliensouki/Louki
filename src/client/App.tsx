import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Layout from './components/Layout';
import Loading from './store/loading/Loading';
import { LoadUser } from './requests/Users';
import { LoadPlaylists } from './requests/Playlists';
import { LoadArtists, LoadAlbums } from './requests/ArtistsOrAlbums';
import { LoadBookmarks } from './requests/Bookmarks';
import { LoadMusics } from './requests/Musics';
import { SnackbarProvider } from 'notistack';
import { IsLoukiSetup, TestSetupResponse } from './requests/Users';
@observer
export default class App extends React.Component<NoProps, NoState> {
  @observable displaySetupModal: boolean = false;

  componentDidMount() {
    this.loadEverything();
  }

  componentDidUpdate() {
    this.loadEverything();
  }

  loadEverything = async () => {
    IsLoukiSetup().then((alreadySetup: TestSetupResponse) => {
      if ((this.displaySetupModal = !alreadySetup) == true) {
        Loading.setEverythingLoaded(true);
      } else {
        LoadUser();
        LoadPlaylists();
        LoadMusics();
        LoadArtists();
        LoadAlbums();
        LoadBookmarks();
      }
    });
  };

  render() {
    if (Loading.loadingIsComplete) {
      return (
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Layout setupModal={this.displaySetupModal} />
          </SnackbarProvider>
        </MuiThemeProvider>
      );
    } else return <React.Fragment />;
  }
}
