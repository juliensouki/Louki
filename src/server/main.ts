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

import IUser from '../shared/IUser';
import IPlaylist from '../shared/IPlaylist';

import databaseHandler from './db';
import dataLoader from './dataLoader';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import { __values } from 'tslib';

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

app.get('/allArtists', (req, res) => {
  databaseHandler.getCollectionContent(Artist).then(value => {
    res.json(value);
  });
});

app.get('/allAlbums', (req, res) => {
  databaseHandler.getCollectionContent(Album).then(value => {
    res.json(value);
  });
});

app.get('/album', (req, res) => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Album, '__id', id).then(value => {
    res.json(value[0]);
  });
});

app.get('/playlists', (req, res) => {
  databaseHandler.getCollectionContent(Playlist).then(value => {
    res.json(value);
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
  databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
    const bookmarks = (values[0] as IUser).favorites;
    res.json({
      musics: musics,
      artists: artists,
      albums: albums,
      bookmarks: bookmarks,
    });
  });
});

app.get('/allPlaylists', (req, res) => {
  const playlists = dLoader.get('playlists');

  res.json(playlists);
});

app.post('/addBookmark', (req, res) => {
  const id = req.body.musicId;
  databaseHandler.addToArray(User, 'selected', true, 'favorites', id).then(
    values => {
      dLoader.loadSpecificData('users');
      databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
        res.json((values[0] as IUser).favorites);
      });
    },
    error => {
      console.log(error);
      res.send(null);
    },
  );
});

app.post('/removeBookmark', (req, res) => {
  const id = req.body.musicId;
  databaseHandler.removeFromArray(User, 'selected', true, 'favorites', id).then(
    values => {
      dLoader.loadSpecificData('users');
      databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
        res.json((values[0] as IUser).favorites);
      });
    },
    error => {
      console.log(error);
      res.send(null);
    },
  );
});

app.post('/removeSongFromPlaylist', (req, res) => {
  const { playlistId, musicId } = req.body;
  databaseHandler.removeFromArray(Playlist, '__id', playlistId, 'musics', musicId).then(() => {
    databaseHandler.findOneInDocument(Playlist, '__id', playlistId).then(values => {
      res.json(values[0] as IPlaylist);
    });
  });
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
    databaseHandler.getCollectionContent(Playlist).then(values => {
      res.send(values);
    });
  });
});

app.post('/addMusicToPlaylist', (req, res) => {
  const { playlistId, musicId } = req.body;

  databaseHandler.findOneInDocument(Playlist, '__id', playlistId).then(values => {
    if (values[0].musics.includes(musicId)) {
      res.sendStatus(403);
    } else {
      databaseHandler.addToArray(Playlist, '__id', playlistId, 'musics', musicId).then(() => {
        res.sendStatus(200);
      });
    }
  });
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
