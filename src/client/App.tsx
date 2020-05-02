import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Layout from './components/Layout';
import LoadingForm from './store/loading/LoadingForm';
import { LoadUser } from './requests/User';
import { LoadPlaylists } from './requests/Playlists';
import { LoadAlbums } from './requests/Albums';
import { LoadArtists } from './requests/Artists';
import { LoadBookmarks } from './requests/Bookmarks';
import { LoadMusics } from './requests/Musics';
import { SnackbarProvider } from 'notistack';
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
    fetch('/alreadySetup')
      .then(res => {
        return res.json();
      })
      .then(alreadySetup => {
        if ((this.displaySetupModal = !alreadySetup) == true) {
          LoadingForm.setEverythingLoaded(true);
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
    if (LoadingForm.loadingIsComplete) {
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
