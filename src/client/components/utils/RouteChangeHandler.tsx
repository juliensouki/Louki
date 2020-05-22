import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Navigation from '../../store/navigation/Navigation';
import LoukiStore from '../../store/data/LoukiStore';
import { GetPlaylist, GetPlaylistResponse } from '../../requests/Playlists';
@observer
class RouteChangerHandler extends React.Component<RouteComponentProps, NoState> {
  componentDidMount() {
    Navigation.setCurrentRoute(this.props.location.pathname);
    if (this.props.location.pathname.includes('/playlist/')) {
      const playlistId = location.pathname.split('/playlist/')[1];
      this.getPlaylist(playlistId);
    }
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    Navigation.setCurrentRoute(this.props.location.pathname);
    Navigation.setPreviousRoute(prevProps.location.pathname);
    if (this.props.location.pathname.includes('/playlist/')) {
      const playlistId = location.pathname.split('/playlist/')[1];
      this.getPlaylist(playlistId);
    }
  }

  getPlaylist = async (playlistId: string) => {
    GetPlaylist(playlistId).then((response: GetPlaylistResponse) => {
      if (response != null) {
        LoukiStore.setCurrentPlaylist(response.data);
      } else {
        this.props.history.push('/all-musics');
      }
    });
  };

  render() {
    return <React.Fragment />;
  }
}

export default withRouter(RouteChangerHandler);
