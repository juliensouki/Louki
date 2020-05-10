import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import multer from 'multer';

import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import routes from './routes/handlers';
import * as config from './config';

import { playlistPictureStorage, profilePictureStorage } from './upload';
import dataLoader from './dataLoader';
import databaseHandler from './db';

const playlistUpload = multer({ storage: multer.diskStorage(profilePictureStorage) });
const profileUpload = multer({ storage: multer.diskStorage(playlistPictureStorage) });

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const startServer = () => {
  console.log('Starting server');
  server.listen(config.SERVER_PORT, () => {
    console.log(`App listening on port ${config.SERVER_PORT}!`);
  });
};

const dLoader = new dataLoader(databaseHandler, io);

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use('/musics', express.static(path.join(process.cwd(), 'musics')));
app.use('/musics2', express.static(path.join(process.cwd(), 'musics2')));
app.use('/scripts', express.static(path.join(process.cwd(), 'musics2')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/artist', (req, res) => routes.getArtist(req, res));
app.get('/album', (req, res) => routes.getAlbum(req, res));
app.get('/playlist', (req, res) => routes.getPlaylist(req, res));
app.get('/currentUser', (req, res) => routes.getCurrentUser(req, res));
app.post('/updateUserSettings', profileUpload.single('profile-picture'), (req, res) => routes.updateSettings(req, res));
app.get('/allData', (req, res) => routes.loadLouki(req, res));
app.get('/allArtists', (req, res) => routes.listArtists(req, res));
app.get('/allAlbums', (req, res) => routes.listAlbums(req, res));
app.get('/allPlaylists', (req, res) => routes.listPlaylists(req, res));
app.get('/allMusics', (req, res) => routes.listMusics(req, res));
app.get('/bookmarks', (req, res) => routes.listBookmarks(req, res));
app.get('/pixabay', (req, res) => routes.testPixabay(req, res));
app.post('/resetLouki', (req, res) => routes.reset(req, res));
app.post('/setupLouki', profileUpload.single('profile-picture'), (req, res) => routes.setupLouki(req, res));
app.get('/alreadySetup', (req, res) => routes.testSetup(req, res));
app.post('/addFolder', (req, res) => routes.addFolder(req, res, dLoader));
app.post('/removeFolder', (req, res) => routes.removeFolder(req, res, dLoader));
app.post('/addBookmark', (req, res) => routes.addBookmark(req, res));
app.post('/removeBookmark', (req, res) => routes.removeBookmark(req, res));
app.post('/createPlaylist', playlistUpload.single('playlist-picture'), (req, res) => routes.createPlaylist(req, res));
app.post('/updatePlaylist', (req, res) => routes.updatePlaylist(req, res));
app.post('/deletePlaylist', (req, res) => routes.deletePlaylist(req, res));
app.post('/addMusicToPlaylist', (req, res) => routes.addMusic(req, res));
app.post('/removeSongFromPlaylist', (req, res) => routes.removeMusic(req, res));
app.post('/search', (req, res) => routes.pixabaySearch(req, res));
app.get('/getResults', (req, res) => routes.musicSearch(req, res));

app.use(apiRouter());
app.use(staticsRouter());
app.use(pagesRouter());

databaseHandler.connect();

mongoose.connection.once('open', function() {
  console.log('Connected to database');
  dLoader.loadData(startServer);
});
