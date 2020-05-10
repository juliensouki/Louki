import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import * as config from './config';

import User from './db/schemas/User';

import databaseHandler from './db';
import dataLoader from './dataLoader';
import bodyParser from 'body-parser';
import { __values } from 'tslib';
import multer from 'multer';

import routes from './routes/handlers';

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const playlistStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads/');
  },
  filename: (req, file, cb) => {
    const name = req.body['playlist-name'];
    const extension = file['mimetype'].split('image/')[1];
    cb(null, name + '.' + extension);
  },
});

const playlistUpload = multer({ storage: playlistStorage });

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads/');
  },
  filename: async (req, file, cb) => {
    const user = await databaseHandler.findOneInDocument(User, 'selected', true);
    let name = '0';
    if (user && user[0]) {
      name = user[0].__id;
    }
    const extension = file['mimetype'].split('image/')[1];
    cb(null, name + '.' + extension);
  },
});

const profileUpload = multer({ storage: profileStorage });

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use('/musics', express.static(path.join(process.cwd(), 'musics')));
app.use('/musics2', express.static(path.join(process.cwd(), 'musics2')));
app.use('/scripts', express.static(path.join(process.cwd(), 'musics2')));
app.use(bodyParser.urlencoded({ extended: true }));

const dLoader = new dataLoader(databaseHandler, io);
databaseHandler.connect();

const startServer = () => {
  console.log('Starting server');
  server.listen(config.SERVER_PORT, () => {
    console.log(`App listening on port ${config.SERVER_PORT}!`);
  });
};

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

mongoose.connection.once('open', function() {
  console.log('Connected to database');
  dLoader.loadData(startServer);
});
