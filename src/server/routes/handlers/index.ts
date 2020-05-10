import { Request, Response } from 'express';

import { handleAddBookmark } from './handle-add-bookmark';
import { handleAddFolder } from './handle-add-folder';
import { handleAddMusic } from './handle-add-music';
import { handleCreatePlaylist } from './handle-create-playlist';
import { handleDeletePlaylist } from './handle-delete-playlist';
import { handleGetAlbum } from './handle-get-album';
import { handleGetArtist } from './handle-get-artist';
import { handleGetCurrentUser } from './handle-get-current-user';
import { handleGetPlaylist } from './handle-get-playlist';
import { handleListAlbums } from './handle-list-albums';
import { handleListArtists } from './handle-list-artists';
import { handleListBookmarks } from './handle-list-bookmarks';
import { handleListMusics } from './handle-list-musics';
import { handleListPlaylists } from './handle-list-playlists';
import { handleLoadLouki } from './handle-load-louki';
import { handleMusicSearch } from './handle-music-search';
import { handlePixabaySearch } from './handle-pixabay-search';
import { handleRemoveBookmark } from './handle-remove-bookmark';
import { handleRemoveFolder } from './handle-remove-folder';
import { handleRemoveMusic } from './handle-remove-music';
import { handleReset } from './handle-reset';
import { handleSetupLouki } from './handle-setup-louki';
import { handleTestPixabay } from './handle-test-pixabay';
import { handleTestSetup } from './handle-test-setup';
import { handleUpdatePlaylist } from './handle-update-playlist';
import { handleUpdateSettings } from './handle-update-settings';

export type Routes = {
  addBookmark: (req: Request, res: Response) => void;
  addFolder: (req: Request, res: Response, dLoader: any) => void;
  addMusic: (req: Request, res: Response) => void;
  createPlaylist: (req: Request, res: Response) => void;
  deletePlaylist: (req: Request, res: Response) => void;
  getAlbum: (req: Request, res: Response) => void;
  getArtist: (req: Request, res: Response) => void;
  getCurrentUser: (req: Request, res: Response) => void;
  getPlaylist: (req: Request, res: Response) => void;
  listAlbums: (req: Request, res: Response) => void;
  listArtists: (req: Request, res: Response) => void;
  listBookmarks: (req: Request, res: Response) => void;
  listMusics: (req: Request, res: Response) => void;
  listPlaylists: (req: Request, res: Response) => void;
  loadLouki: (req: Request, res: Response) => void;
  musicSearch: (req: Request, res: Response) => void;
  pixabaySearch: (req: Request, res: Response) => void;
  removeBookmark: (req: Request, res: Response) => void;
  removeFolder: (req: Request, res: Response, dLoader: any) => void;
  removeMusic: (req: Request, res: Response) => void;
  reset: (req: Request, res: Response) => void;
  setupLouki: (req: Request, res: Response) => void;
  testPixabay: (req: Request, res: Response) => void;
  testSetup: (req: Request, res: Response) => void;
  updatePlaylist: (req: Request, res: Response) => void;
  updateSettings: (req: Request, res: Response) => void;
};

const routes: Routes = {
  addBookmark: handleAddBookmark,
  addFolder: handleAddFolder,
  addMusic: handleAddMusic,
  createPlaylist: handleCreatePlaylist,
  deletePlaylist: handleDeletePlaylist,
  getAlbum: handleGetAlbum,
  getArtist: handleGetArtist,
  getCurrentUser: handleGetCurrentUser,
  getPlaylist: handleGetPlaylist,
  listAlbums: handleListAlbums,
  listArtists: handleListArtists,
  listBookmarks: handleListBookmarks,
  listMusics: handleListMusics,
  listPlaylists: handleListPlaylists,
  loadLouki: handleLoadLouki,
  musicSearch: handleMusicSearch,
  pixabaySearch: handlePixabaySearch,
  removeBookmark: handleRemoveBookmark,
  removeFolder: handleRemoveFolder,
  removeMusic: handleRemoveMusic,
  reset: handleReset,
  setupLouki: handleSetupLouki,
  testPixabay: handleTestPixabay,
  testSetup: handleTestSetup,
  updatePlaylist: handleUpdatePlaylist,
  updateSettings: handleUpdateSettings,
};

export default routes;
