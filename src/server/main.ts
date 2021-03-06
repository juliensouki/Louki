import express, { Router } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';

import { apiRouter } from './config/api-router';
import { staticsRouter } from './config/statics-router';
import routes from './routes';
import { config, app, server } from './config';

import { playlistPictureStorage, profilePictureStorage } from './upload';
import filesWatcher from './filesWatcher';
import databaseHandler from './db';
import logger from './logger';

const playlistUpload = multer({ storage: multer.diskStorage(profilePictureStorage) });
const profileUpload = multer({ storage: multer.diskStorage(playlistPictureStorage) });

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use('/views', express.static(path.join(process.cwd(), 'views')));
app.use('/musics', express.static(path.join(process.cwd(), 'musics')));
app.use('/musics2', express.static(path.join(process.cwd(), 'musics2')));
app.use('/scripts', express.static(path.join(process.cwd(), 'musics2')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/artist/:artistId', (req, res) => routes.getArtist(req, res));
app.get('/api/v1/album/:albumId', (req, res) => routes.getAlbum(req, res));
app.get('/api/v1/playlist/:playlistId', (req, res) => routes.getPlaylist(req, res));
app.get('/api/v1/current-user', (req, res) => routes.getCurrentUser(req, res));
app.get('/api/v1/list-artists', (req, res) => routes.listArtists(req, res));
app.get('/api/v1/list-albums', (req, res) => routes.listAlbums(req, res));
app.get('/api/v1/list-playlists', (req, res) => routes.listPlaylists(req, res));
app.get('/api/v1/list-musics', (req, res) => routes.listMusics(req, res));
app.get('/api/v1/list-bookmarks', (req, res) => routes.listBookmarks(req, res));
app.get('/api/v1/test-pixabay', (req, res) => routes.testPixabay(req, res));
app.post('/api/v1/reset-louki', (req, res) => routes.reset(req, res));
app.post('/api/v1/setup-louki', profileUpload.single('profile-picture'), (req, res) => routes.setupLouki(req, res));
app.post('/api/v1/update-user-settings', profileUpload.single('profile-picture'), (req, res) => {
  routes.updateSettings(req, res);
});
app.get('/api/v1/already-setup', (req, res) => routes.testSetup(req, res));
app.post('/api/v1/add-folder', (req, res) => routes.addFolder(req, res));
app.post('/api/v1/remove-folder', (req, res) => routes.removeFolder(req, res));
app.post('/api/v1/add-bookmark', (req, res) => routes.addBookmark(req, res));
app.post('/api/v1/remove-bookmark', (req, res) => routes.removeBookmark(req, res));
app.post('/api/v1/create-playlist', playlistUpload.single('playlist-picture'), (req, res) => {
  routes.createPlaylist(req, res);
});
app.post('/api/v1/playlist/:playlistId/update-playlist', (req, res) => routes.updatePlaylist(req, res));
app.post('/api/v1/playlist/:playlistId/delete-playlist', (req, res) => routes.deletePlaylist(req, res));
app.post('/api/v1/playlist/:playlistId/add-music', (req, res) => routes.addMusic(req, res));
app.post('/api/v1/playlist/:playlistId/remove-music', (req, res) => routes.removeMusic(req, res));
app.post('/api/v1/search-music', (req, res) => routes.musicSearch(req, res));
app.get('/api/v1/search-pixabay', (req, res) => routes.pixabaySearch(req, res));

if (config.checkEnv()) {
  app.use(apiRouter());
  app.use(staticsRouter());

  const startServer = (router: Router) => {
    app.use(router);
    logger.info('Starting server');
    server.listen(config.SERVER_PORT, () => {
      logger.info(`App listening on port ${config.SERVER_PORT}!`);
    });
  };

  databaseHandler.connect(startServer);

  mongoose.connection.once('open', function() {
    logger.info('Connected to database : ' + process.env.DATABASE_URL);
    filesWatcher.loadData(startServer);
  });
}
