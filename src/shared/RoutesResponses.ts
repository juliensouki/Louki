import mongoose from 'mongoose';
import { Artist, Album, Playlist, Music, User } from './LoukiTypes';

interface UpdatePlaylistBody {
  playlists: Array<Playlist>;
  currentPlaylist: Playlist;
}

export interface CustomError {
  name: string;
  message: string;
  details?: any;
}

export type GetArtistResponse = Artist;
export type GetAlbumResponse = Album;
export type GetPlaylistResponse = Playlist;
export type GetCurrentUserResponse = User;
export type UpdateSettingsResponse = User;
export type LoadLoukiResponse = any;
export type ListArtistsResponse = Array<Artist>;
export type ListAlbumsResponse = Array<Album>;
export type ListPlaylistsResponse = Array<Playlist>;
export type ListMusicsResponse = Array<Music>;
export type ListBookmarksResponse = Array<string> | null;
export type TestPixabayResponse = boolean;
export type TestSetupResponse = boolean;
export type SetupLoukiResponse = User;
export type AddFolderResponse = User;
export type RemoveFolderResponse = User;
export type AddBookmarkResponse = Array<string> | null;
export type RemoveBookmarkResponse = Array<string> | null;
export type CreatePlaylistResponse = Array<Playlist>;
export type DeletePlaylistResponse = Array<Playlist>;
export type RemoveMusicResponse = Playlist;
export type PixabaySearchResponse = Array<string>;
export type MusicSearchResponse = Array<string>;
export type UpdatePlaylistResponse = UpdatePlaylistBody;
export type ServerError = CustomError | mongoose.Error;
