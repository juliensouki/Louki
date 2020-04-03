import MusicsData from '../store/common/MusicsData';
import LoadingForm from '../store/loading/LoadingForm';

export const LoadPlaylists = async () => {
  fetch('/allPlaylists')
    .then(res => {
      return res.json();
    })
    .then(data => {
      MusicsData.setPlaylists(data);
      LoadingForm.playlistsHaveLoaded();
    });
};
