import MusicsData from '../store/common/MusicsData';
import LoadingForm from '../store/loading/LoadingForm';

export const LoadArtists = async () => {
  fetch('/artists')
    .then(res => {
      return res.json();
    })
    .then(data => {
      MusicsData.setArtists(data);
      LoadingForm.artistsHaveLoaded();
    });
};
