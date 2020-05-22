import { Artist, Album, Playlist, Music, User } from './LoukiTypes';
import mongoose from 'mongoose';

interface UpdatePlaylistBody {
  playlists: Array<Playlist>;
  currentPlaylist: Playlist;
}

export interface APIResponse<T> {
  status: number;
  data: T | null;
  error: Error | null;
}

export interface CustomError {
  name: string;
  message: string;
  details?: any;
}

export type Error = CustomError | mongoose.Error;

export type GetArtist = Artist;
export type GetAlbum = Album;
export type GetPlaylist = Playlist;
export type GetCurrentUser = User;
export type UpdateSettings = User;
export type ListArtists = Array<Artist>;
export type ListAlbums = Array<Album>;
export type ListPlaylists = Array<Playlist>;
export type ListMusics = Array<Music>;
export type ListBookmarks = Array<string | null>;
export type TestPixabay = boolean;
export type TestSetup = boolean;
export type SetupLouki = User;
export type AddFolder = User;
export type RemoveFolder = User;
export type AddBookmark = Array<string | null>;
export type RemoveBookmark = Array<string | null>;
export type CreatePlaylist = Array<Playlist>;
export type DeletePlaylist = Array<Playlist>;
export type RemoveMusic = Playlist;
export type PixabaySearch = Array<string>;
export type MusicSearch = Array<string>;
export type UpdatePlaylist = UpdatePlaylistBody;

export const buildResponse = (status: number, response: any): APIResponse<any> => {
  return {
    status: status,
    data: response instanceof Error ? null : response,
    error: response instanceof Error ? response : null,
  };
};
