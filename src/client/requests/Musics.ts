import MusicsData from '../store/common/MusicsData';
import LoadingForm from '../store/loading/LoadingForm';

export const LoadMusics = async () => {
  fetch('/allMusics')
    .then(res => {
      return res.json();
    })
    .then(data => {
      MusicsData.setMusics(data);
      LoadingForm.musicsHaveLoaded();
    });
};
