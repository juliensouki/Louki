"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const api_router_1 = require("./config/api-router");
const statics_router_1 = require("./config/statics-router");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const config_1 = require("./config");
const upload_1 = require("./upload");
const filesWatcher_1 = tslib_1.__importDefault(require("./filesWatcher"));
const db_1 = tslib_1.__importDefault(require("./db"));
const logger_1 = tslib_1.__importDefault(require("./logger"));
const playlistUpload = multer_1.default({ storage: multer_1.default.diskStorage(upload_1.profilePictureStorage) });
const profileUpload = multer_1.default({ storage: multer_1.default.diskStorage(upload_1.playlistPictureStorage) });
config_1.app.set('view engine', 'ejs');
config_1.app.use(express_1.default.json());
config_1.app.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), 'assets')));
config_1.app.use('/views', express_1.default.static(path_1.default.join(process.cwd(), 'views')));
config_1.app.use('/musics', express_1.default.static(path_1.default.join(process.cwd(), 'musics')));
config_1.app.use('/musics2', express_1.default.static(path_1.default.join(process.cwd(), 'musics2')));
config_1.app.use('/scripts', express_1.default.static(path_1.default.join(process.cwd(), 'musics2')));
config_1.app.use(body_parser_1.default.urlencoded({ extended: true }));
config_1.app.get('/api/v1/artist/:artistId', (req, res) => routes_1.default.getArtist(req, res));
config_1.app.get('/api/v1/album/:albumId', (req, res) => routes_1.default.getAlbum(req, res));
config_1.app.get('/api/v1/playlist/:playlistId', (req, res) => routes_1.default.getPlaylist(req, res));
config_1.app.get('/api/v1/current-user', (req, res) => routes_1.default.getCurrentUser(req, res));
config_1.app.get('/api/v1/list-artists', (req, res) => routes_1.default.listArtists(req, res));
config_1.app.get('/api/v1/list-albums', (req, res) => routes_1.default.listAlbums(req, res));
config_1.app.get('/api/v1/list-playlists', (req, res) => routes_1.default.listPlaylists(req, res));
config_1.app.get('/api/v1/list-musics', (req, res) => routes_1.default.listMusics(req, res));
config_1.app.get('/api/v1/list-bookmarks', (req, res) => routes_1.default.listBookmarks(req, res));
config_1.app.get('/api/v1/test-pixabay', (req, res) => routes_1.default.testPixabay(req, res));
config_1.app.post('/api/v1/reset-louki', (req, res) => routes_1.default.reset(req, res));
config_1.app.post('/api/v1/setup-louki', profileUpload.single('profile-picture'), (req, res) => routes_1.default.setupLouki(req, res));
config_1.app.post('/api/v1/update-user-settings', profileUpload.single('profile-picture'), (req, res) => {
    routes_1.default.updateSettings(req, res);
});
config_1.app.get('/api/v1/already-setup', (req, res) => routes_1.default.testSetup(req, res));
config_1.app.post('/api/v1/add-folder', (req, res) => routes_1.default.addFolder(req, res));
config_1.app.post('/api/v1/remove-folder', (req, res) => routes_1.default.removeFolder(req, res));
config_1.app.post('/api/v1/add-bookmark', (req, res) => routes_1.default.addBookmark(req, res));
config_1.app.post('/api/v1/remove-bookmark', (req, res) => routes_1.default.removeBookmark(req, res));
config_1.app.post('/api/v1/create-playlist', playlistUpload.single('playlist-picture'), (req, res) => {
    routes_1.default.createPlaylist(req, res);
});
config_1.app.post('/api/v1/playlist/:playlistId/update-playlist', (req, res) => routes_1.default.updatePlaylist(req, res));
config_1.app.post('/api/v1/playlist/:playlistId/delete-playlist', (req, res) => routes_1.default.deletePlaylist(req, res));
config_1.app.post('/api/v1/playlist/:playlistId/add-music', (req, res) => routes_1.default.addMusic(req, res));
config_1.app.post('/api/v1/playlist/:playlistId/remove-music', (req, res) => routes_1.default.removeMusic(req, res));
config_1.app.post('/api/v1/search-music', (req, res) => routes_1.default.musicSearch(req, res));
config_1.app.get('/api/v1/search-pixabay', (req, res) => routes_1.default.pixabaySearch(req, res));
if (config_1.config.checkEnv()) {
    config_1.app.use(api_router_1.apiRouter());
    config_1.app.use(statics_router_1.staticsRouter());
    const startServer = (router) => {
        config_1.app.use(router);
        logger_1.default.info('Starting server');
        config_1.server.listen(config_1.config.SERVER_PORT, () => {
            logger_1.default.info(`App listening on port ${config_1.config.SERVER_PORT}!`);
        });
    };
    db_1.default.connect(startServer);
    mongoose_1.default.connection.once('open', function () {
        logger_1.default.info('Connected to database : ' + process.env.DATABASE_URL);
        filesWatcher_1.default.loadData(startServer);
    });
}
//# sourceMappingURL=main.js.map