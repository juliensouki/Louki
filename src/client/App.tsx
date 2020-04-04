import * as React from 'react';
import { observer } from 'mobx-react';
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
  async componentDidMount() {
    LoadUser();
    LoadPlaylists();
    LoadMusics();
    LoadArtists();
    LoadAlbums();
    LoadBookmarks();
  }

  render() {
    if (LoadingForm.loadingIsComplete) {
      return (
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Layout />
          </SnackbarProvider>
        </MuiThemeProvider>
      );
    } else return <React.Fragment />;
  }
}
