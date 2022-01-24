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
export declare type Error = CustomError | mongoose.Error;
export declare type GetArtist = Artist;
export declare type GetAlbum = Album;
export declare type GetPlaylist = Playlist;
export declare type GetCurrentUser = User;
export declare type UpdateSettings = User;
export declare type ListArtists = Array<Artist>;
export declare type ListAlbums = Array<Album>;
export declare type ListPlaylists = Array<Playlist>;
export declare type ListMusics = Array<Music>;
export declare type ListBookmarks = Array<string | null>;
export declare type TestPixabay = boolean;
export declare type TestSetup = boolean;
export declare type SetupLouki = User;
export declare type AddFolder = User;
export declare type RemoveFolder = User;
export declare type AddBookmark = Array<string | null>;
export declare type RemoveBookmark = Array<string | null>;
export declare type CreatePlaylist = Array<Playlist>;
export declare type DeletePlaylist = Array<Playlist>;
export declare type RemoveMusic = Playlist;
export declare type PixabaySearch = Array<string>;
export declare type MusicSearch = Array<string>;
export declare type UpdatePlaylist = UpdatePlaylistBody;
export declare const buildResponse: (status: number, response: any) => APIResponse<any>;
export {};
