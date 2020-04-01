import * as React from 'react';
import { useLocation } from 'react-router';
import CurrentPlaylist from '../../store/fragments/playlist/CurrentPlaylist';
import IPlaylist from '../../../shared/IPlaylist';

const RouteChangeHandler = () => {
  const location = useLocation();

  async function getPlaylist(playlistId: string) {
    fetch('/playlist?id=' + playlistId)
      .then(res => {
        return res.json();
      })
      .then(data => {
        CurrentPlaylist.setPlaylist(data as IPlaylist);
      });
  }

  React.useEffect(() => {
    if (location.pathname.includes('/playlist/')) {
      const playlistId = location.pathname.split('/playlist/')[1];
      getPlaylist(playlistId);
    }
  }, [location.pathname]);

  return <React.Fragment />;
};

export default RouteChangeHandler;
