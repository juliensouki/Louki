import IArtist from './IArtist';
import IAlbum from './IAlbum';

export interface UpdateArtistOrAlbumResponse {
  id: string;
  data: IArtist | IAlbum;
}
