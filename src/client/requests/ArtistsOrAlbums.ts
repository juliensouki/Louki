import LoukiStore from '../store/data/LoukiStore';
import Loading from '../store/loading/Loading';
import * as Responses from '../../shared/RoutesResponses';

export type GetArtistOrAlbumResponse = Responses.GetArtistResponse | Responses.GetAlbumResponse;

export const LoadAlbums = (): void => {
  fetch(`/api/v1/list-albums`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      LoukiStore.setAlbums(data);
      Loading.albumsHaveLoaded();
    });
};

export const LoadArtists = (): void => {
  fetch(`/api/v1/list-artists`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      LoukiStore.setArtists(data);
      Loading.artistsHaveLoaded();
    });
};

export const GetArtistOrAlbum = (artistOrAlbum: string, id: string): Promise<GetArtistOrAlbumResponse> => {
  return fetch(`/api/v1/${artistOrAlbum}/${id}`).then(res => {
    return res.json();
  });
};
