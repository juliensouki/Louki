import { Request, Response } from 'express';

import { handleAddBookmark } from './handlers/handle-add-bookmark';
import { handleAddFolder } from './handlers/handle-add-folder';
import { handleAddMusic } from './handlers/handle-add-music';
import { handleCreatePlaylist } from './handlers/handle-create-playlist';
import { handleDeletePlaylist } from './handlers/handle-delete-playlist';
import { handleGetAlbum } from './handlers/handle-get-album';
import { handleGetArtist } from './handlers/handle-get-artist';
import { handleGetCurrentUser } from './handlers/handle-get-current-user';
import { handleGetPlaylist } from './handlers/handle-get-playlist';
import { handleListAlbums } from './handlers/handle-list-albums';
import { handleListArtists } from './handlers/handle-list-artists';
import { handleListBookmarks } from './handlers/handle-list-bookmarks';
import { handleListMusics } from './handlers/handle-list-musics';
import { handleListPlaylists } from './handlers/handle-list-playlists';
import { handleMusicSearch } from './handlers/handle-music-search';
import { handlePixabaySearch } from './handlers/handle-pixabay-search';
import { handleRemoveBookmark } from './handlers/handle-remove-bookmark';
import { handleRemoveFolder } from './handlers/handle-remove-folder';
import { handleRemoveMusic } from './handlers/handle-remove-music';
import { handleReset } from './handlers/handle-reset';
import { handleSetupLouki } from './handlers/handle-setup-louki';
import { handleTestPixabay } from './handlers/handle-test-pixabay';
import { handleTestSetup } from './handlers/handle-test-setup';
import { handleUpdatePlaylist } from './handlers/handle-update-playlist';
import { handleUpdateSettings } from './handlers/handle-update-settings';

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
