import LoukiStore from '../store/data/LoukiStore';
import Loading from '../store/loading/Loading';

export const LoadMusics = async () => {
  fetch(`/api/v1/list-musics`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      LoukiStore.setMusics(data);
      Loading.musicsHaveLoaded();
    });
};
