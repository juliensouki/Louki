import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import CurrentPlaylist from '../../store/fragments/playlist/CurrentPlaylist';
import NavigationForm from '../../store/common/NavigationForm';
import IPlaylist from '../../../shared/IPlaylist';
@observer
class RouteChangerHandler extends React.Component<RouteComponentProps, NoState> {
  componentDidMount() {
    NavigationForm.setCurrentRoute(this.props.location.pathname);
    if (this.props.location.pathname.includes('/playlist/')) {
      const playlistId = location.pathname.split('/playlist/')[1];
      this.getPlaylist(playlistId);
    }
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    NavigationForm.setCurrentRoute(this.props.location.pathname);
    NavigationForm.setPreviousRoute(prevProps.location.pathname);
    if (this.props.location.pathname.includes('/playlist/')) {
      const playlistId = location.pathname.split('/playlist/')[1];
      this.getPlaylist(playlistId);
    }
  }

  getPlaylist = async (playlistId: string) => {
    fetch('/playlist?id=' + playlistId)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data != null) {
          CurrentPlaylist.setPlaylist(data as IPlaylist);
        } else {
          this.props.history.push('/all-music');
        }
      });
  };

  render() {
    return <React.Fragment />;
  }
}

export default withRouter(RouteChangerHandler);
