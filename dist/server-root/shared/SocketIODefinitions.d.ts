import { Artist, Album } from './LoukiTypes';
export interface UpdateArtistOrAlbumResponse {
    id: string;
    data: Artist | Album;
}
