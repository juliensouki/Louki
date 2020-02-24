import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import * as config from './config';

import Playlist from './db/schemas/Playlist';
import Artist from './db/schemas/Artist';
import Album from './db/schemas/Album';
import User from './db/schemas/User';

import databaseHandler from './db';
import dataLoader from './dataLoader';
import uuid from 'uuid';
import bodyParser from 'body-parser';

const app = express();
const dLoader = new dataLoader(databaseHandler);

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use('/musics', express.static(path.join(process.cwd(), 'musics')));
app.use('/musics2', express.static(path.join(process.cwd(), 'musics2')));
app.use(bodyParser.urlencoded({ extended: true }));

databaseHandler.connect();

const startServer = () => {
  app.listen(config.SERVER_PORT, () => {
    console.log(`App listening on port ${config.SERVER_PORT}!`);
  });
};

app.get('/artist', (req, res) => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Artist, '__id', id).then(value => {
    res.json(value[0]);
  });
});

app.get('/album', (req, res) => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Album, '__id', id).then(value => {
    res.json(value[0]);
  });
});

app.get('/currentUser', (req, res) => {
  const user = dLoader.get('currentUser');
  res.json(user);
});

app.get('/bookmarks', (req, res) => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(value => {
    res.json(value[0].favorites);
  });
});

app.get('/playlist', (req, res) => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Playlist, '__id', id).then(value => {
    res.json(value[0]);
  });
});

app.get('/allMusics', (req, res) => {
  const musics = dLoader.get('musics');
  res.json(musics);
});

app.get('/allData', (req, res) => {
  const musics = dLoader.get('musics');
  const artists = dLoader.get('artists');
  const albums = dLoader.get('albums');

  res.json({
    musics: musics,
    artists: artists,
    albums: albums,
  });
});

app.get('/allPlaylists', (req, res) => {
  const playlists = dLoader.get('playlists');

  res.json(playlists);
});

app.post('/addBookmark', (req, res) => {
  const id = req.body.musicId;
  databaseHandler.addToArray(User, 'selected', true, 'favorites', id);
});

app.post('/removeBookmark', (req, res) => {
  const id = req.body.musicId;
  databaseHandler.removeFromArray(User, 'selected', true, 'favorites', id);
});

app.post('/removeSongFromPlaylist', (req, res) => {
  const { playlistId, musicId } = req.body;
  databaseHandler.removeFromArray(Playlist, '__id', playlistId, 'musics', musicId);
});

app.post('/createPlaylist', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const creationDate = new Date().getTime();
  const userId = dLoader.get('currentUser').__id;
  const id = uuid.v4();

  Playlist.create(
    {
      name: name,
      picture: '',
      description: description,
      musics: [],
      createdAt: creationDate,
      createdBy: userId,
      __id: id,
    },
    error => {
      dLoader.loadSpecificData('playlists');
      databaseHandler.getCollectionContent(Playlist).then(values => {
        res.send(values);
      });
    },
  );
});

app.post('/deletePlaylist', (req, res) => {
  const id = req.body.playlistId;

  databaseHandler.deleteFromDocument(Playlist, '__id', id).then(() => {
    dLoader.loadSpecificData('playlists');
  });
});

app.post('/addMusicToPlaylist', (req, res) => {
  const { playlistId, musicId } = req.body;

  databaseHandler.addToArray(Playlist, '__id', playlistId, 'musics', musicId);
});

app.post('/updatePlaylist', (req, res) => {
  const { playlistId, playlistName, playlistDescription } = req.body;

  const jsonUpdate = {
    name: playlistName,
    description: playlistDescription,
  };
  databaseHandler.updateDocument(Playlist, playlistId, jsonUpdate);
});

app.use(apiRouter());
app.use(staticsRouter());
app.use(pagesRouter());

mongoose.connection.once('open', function() {
  console.log('Connected to database');
  dLoader.loadData(startServer);
});
