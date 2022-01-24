"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMusicRoute = void 0;
const config_1 = require("../config");
const handle_add_bookmark_1 = require("./handlers/handle-add-bookmark");
const handle_add_folder_1 = require("./handlers/handle-add-folder");
const handle_add_music_1 = require("./handlers/handle-add-music");
const handle_create_playlist_1 = require("./handlers/handle-create-playlist");
const handle_delete_playlist_1 = require("./handlers/handle-delete-playlist");
const handle_get_album_1 = require("./handlers/handle-get-album");
const handle_get_artist_1 = require("./handlers/handle-get-artist");
const handle_get_current_user_1 = require("./handlers/handle-get-current-user");
const handle_get_playlist_1 = require("./handlers/handle-get-playlist");
const handle_list_albums_1 = require("./handlers/handle-list-albums");
const handle_list_artists_1 = require("./handlers/handle-list-artists");
const handle_list_bookmarks_1 = require("./handlers/handle-list-bookmarks");
const handle_list_musics_1 = require("./handlers/handle-list-musics");
const handle_list_playlists_1 = require("./handlers/handle-list-playlists");
const handle_music_search_1 = require("./handlers/handle-music-search");
const handle_pixabay_search_1 = require("./handlers/handle-pixabay-search");
const handle_remove_bookmark_1 = require("./handlers/handle-remove-bookmark");
const handle_remove_folder_1 = require("./handlers/handle-remove-folder");
const handle_remove_music_1 = require("./handlers/handle-remove-music");
const handle_reset_1 = require("./handlers/handle-reset");
const handle_setup_louki_1 = require("./handlers/handle-setup-louki");
const handle_test_pixabay_1 = require("./handlers/handle-test-pixabay");
const handle_test_setup_1 = require("./handlers/handle-test-setup");
const handle_update_playlist_1 = require("./handlers/handle-update-playlist");
const handle_update_settings_1 = require("./handlers/handle-update-settings");
const routes = {
    addBookmark: handle_add_bookmark_1.handleAddBookmark,
    addFolder: handle_add_folder_1.handleAddFolder,
    addMusic: handle_add_music_1.handleAddMusic,
    createPlaylist: handle_create_playlist_1.handleCreatePlaylist,
    deletePlaylist: handle_delete_playlist_1.handleDeletePlaylist,
    getAlbum: handle_get_album_1.handleGetAlbum,
    getArtist: handle_get_artist_1.handleGetArtist,
    getCurrentUser: handle_get_current_user_1.handleGetCurrentUser,
    getPlaylist: handle_get_playlist_1.handleGetPlaylist,
    listAlbums: handle_list_albums_1.handleListAlbums,
    listArtists: handle_list_artists_1.handleListArtists,
    listBookmarks: handle_list_bookmarks_1.handleListBookmarks,
    listMusics: handle_list_musics_1.handleListMusics,
    listPlaylists: handle_list_playlists_1.handleListPlaylists,
    musicSearch: handle_music_search_1.handleMusicSearch,
    pixabaySearch: handle_pixabay_search_1.handlePixabaySearch,
    removeBookmark: handle_remove_bookmark_1.handleRemoveBookmark,
    removeFolder: handle_remove_folder_1.handleRemoveFolder,
    removeMusic: handle_remove_music_1.handleRemoveMusic,
    reset: handle_reset_1.handleReset,
    setupLouki: handle_setup_louki_1.handleSetupLouki,
    testPixabay: handle_test_pixabay_1.handleTestPixabay,
    testSetup: handle_test_setup_1.handleTestSetup,
    updatePlaylist: handle_update_playlist_1.handleUpdatePlaylist,
    updateSettings: handle_update_settings_1.handleUpdateSettings,
};
exports.addMusicRoute = (music) => {
    config_1.app.get('/api/v1/music/' + music.__id, (_, res) => {
        res.sendFile(music.path);
    });
};
exports.default = routes;
//# sourceMappingURL=index.js.map