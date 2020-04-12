import MusicsData from '../store/common/MusicsData';
import LoadingForm from '../store/loading/LoadingForm';

export const LoadAlbums = async () => {
  fetch('/allAlbums')
    .then(res => {
      return res.json();
    })
    .then(data => {
      MusicsData.setAlbums(data);
      LoadingForm.albumsHaveLoaded();
    });
};
