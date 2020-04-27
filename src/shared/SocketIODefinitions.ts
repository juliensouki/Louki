import IArtist from './IArtist';
import IAlbum from './IAlbum';

export interface UpdateArtistOrAlbumResponse { //eslint-disable-line
  id: string;
  data: IArtist | IAlbum;
}
