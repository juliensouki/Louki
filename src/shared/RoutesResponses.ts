import IArtist from './IArtist';
import IAlbum from './IAlbum';
import IPlaylist from './IPlaylist';
import IMusic from './IMusic';
import IUser from './IUser';

export interface UpdatePlaylistBody {
  playlists: Array<IPlaylist>;
  currentPlaylist: IPlaylist;
}

export type GetArtistResponse = IArtist;
export type GetAlbumResponse = IAlbum;
export type GetPlaylistResponse = IPlaylist;
export type GetCurrentUserResponse = IUser;
export type UpdateSettingsResponse = IUser;
export type LoadLoukiResponse = any;
export type ListArtistsResponse = Array<IArtist>;
export type ListAlbumsResponse = Array<IAlbum>;
export type ListPlaylistsResponse = Array<IPlaylist>;
export type ListMusicsResponse = Array<IMusic>;
export type ListBookmarksResponse = Array<string> | null;
export type TestPixabayResponse = boolean;
export type TestSetupResponse = boolean;
export type SetupLoukiResponse = IUser;
export type AddFolderResponse = IUser;
export type RemoveFolderResponse = IUser;
export type AddBookmarkResponse = Array<string> | null;
export type RemoveBookmarkResponse = Array<string> | null;
export type CreatePlaylistResponse = Array<IPlaylist>;
export type DeletePlaylistResponse = Array<IPlaylist>;
export type RemoveMusicResponse = IPlaylist;
export type PixabaySearchResponse = Array<string>;
export type MusicSearchResponse = Array<string>;
export type UpdatePlaylistResponse = UpdatePlaylistBody;
