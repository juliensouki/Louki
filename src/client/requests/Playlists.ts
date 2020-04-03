import MusicsData from '../store/common/MusicsData';
import LoadingForm from '../store/loading/LoadingForm';

export const LoadPlaylists = async () => {
  fetch('/playlists')
    .then(res => {
      return res.json();
    })
    .then(data => {
      MusicsData.setPlaylists(data);
      LoadingForm.playlistsHaveLoaded();
    });
};
