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
import Music from './db/schemas/Music';

import IUser, { AccountSettings } from '../shared/IUser';
import IPlaylist from '../shared/IPlaylist';

import databaseHandler from './db';
import dataLoader from './dataLoader';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import { __values } from 'tslib';
import multer from 'multer';
import { searchImages } from 'pixabay-api';
import leven from 'leven';

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
    io.on('connect', socket => {});
  });
};

app.get('/pixabay', (req, res) => {
  searchImages(process.env.PIXABAY_API_KEY, 'piano')
    .then(results => {
      if (results && results.hits.length > 0) {
        res.status(200).json({ result: true });
      } else {
        res.status(200).json({ result: false });
      }
    })
    .catch(() => {
      res.status(200).json({ result: false });
    });
});

app.get('/alreadySetup', (req, res) => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
    res.send(values && values.length > 0);
  });
});

app.get('/getResults', (req, res) => {
  const search = req.query.search;
  searchImages(process.env.PIXABAY_API_KEY, search as string).then(results => {
    const images = [];
    for (let i = 0; i < results.hits.length; i++) {
      images.push(results.hits[i].webformatURL);
    }
    res.send(images);
  });
});

app.get('/artist', (req, res) => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Artist, '__id', id).then(value => {
    if (value && value.length > 0) {
      res.json(value[0]);
    } else {
      res.json(null);
    }
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
    if (value && value.length > 0) {
      res.json(value[0]);
    } else {
      res.json(null);
    }
  });
});

app.get('/playlists', (req, res) => {
  databaseHandler.getCollectionContent(Playlist).then(value => {
    res.json(value);
  });
});

app.get('/currentUser', (req, res) => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
    res.json(users[0]);
  });
});

app.get('/bookmarks', (req, res) => {
  databaseHandler.findOneInDocument(User, 'selected', true).then(value => {
    if (value && value.length > 0) {
      res.status(200).json(value[0].favorites);
    } else {
      res.status(401);
    }
  });
});

app.get('/playlist', (req, res) => {
  const id = req.query.id;
  databaseHandler.findOneInDocument(Playlist, '__id', id).then(value => {
    if (value && value.length > 0) {
      res.json(value[0]);
    } else {
      res.json(null);
    }
  });
});

app.get('/allMusics', (req, res) => {
  databaseHandler.getCollectionContent(Music).then(musics => {
    res.json(musics);
  });
});

app.post('/resetLouki', (req, res) => {
  const promises = [
    User.deleteMany({}),
    Music.deleteMany({}),
    Playlist.deleteMany({}),
    Artist.deleteMany({}),
    Album.deleteMany({}),
  ];

  Promise.all(promises).then(() => {
    res.status(200).json({});
  });
});

app.post('/search', (req, res) => {
  const { searchText, musics } = req.body;
  databaseHandler.findMany(Music, '__id', musics as Array<string>).then(results => {
    if (results.length == 0) {
      res.json(results);
    } else {
      const musicNames: Array<string> = [];
      results.forEach(music => {
        if (leven(searchText, music.title) < 10 || music.title.toLowerCase().includes(searchText.toLowerCase())) {
          musicNames.push(music.__id);
        }
      });
      res.json(musicNames);
    }
  });
});

app.get('/allData', async (req, res) => {
  const musics = await databaseHandler.getCollectionContent(Music);
  const artists = await databaseHandler.getCollectionContent(Artist);
  const albums = await databaseHandler.getCollectionContent(Album);
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
  databaseHandler.getCollectionContent(Playlist).then(playlists => {
    res.json(playlists);
  });
});

app.post('/addFolder', (req, res) => {
  const { folder } = req.body;
  databaseHandler.addToArray(User, 'selected', true, 'musicPaths', folder).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      dLoader.watchFolder(folder);
      res.status(200).json(users[0]);
    });
  });
});

app.post('/removeFolder', (req, res) => {
  const { folder } = req.body;
  databaseHandler.removeFromArray(User, 'selected', true, 'musicPaths', folder).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(users => {
      dLoader.unwatchFolder(folder);
      res.status(200).json(users[0]);
    });
  });
});

app.post('/setupLouki', profileUpload.single('profile-picture'), (req, res) => {
  let profilePicture = '';
  if ((req as any).file) {
    const extension = (req as any).file['mimetype'].split('image/')[1];
    profilePicture = '/assets/uploads/0.' + extension;
  }

  User.create({
    name: req.body.username,
    picture: profilePicture,
    selected: true,
    __id: 0,
    settings: {
      language: 'english',
      username: '',
      profilePicture: profilePicture,
      internetUsage: true,
    },
  }).then(user => {
    res.status(200).json(user);
  });
});

app.post('/updateUserSettings', profileUpload.single('profile-picture'), async (req, res) => {
  const id = req.body.id;
  const settings = JSON.parse(req.body.settings) as AccountSettings;
  const file = (req as any).file;

  const jsonUpdate = {
    name: settings.username,
    settings: settings,
  };

  if (file) {
    const extension = file['mimetype'].split('image/')[1];
    settings.profilePicture = '/assets/uploads/' + id + '.' + extension;
  } else {
    const user = await databaseHandler.findOneInDocument(User, 'selected', true);
    settings.profilePicture = user[0].settings.profilePicture;
  }

  databaseHandler.updateDocument(User, id, jsonUpdate).then(() => {
    databaseHandler.findOneInDocument(User, 'selected', true).then(values => {
      res.json(values[0] as IUser);
    });
  });
});

app.post('/addBookmark', (req, res) => {
  const id = req.body.musicId;
  databaseHandler.addToArray(User, 'selected', true, 'favorites', id).then(
    () => {
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

app.post('/createPlaylist', playlistUpload.single('playlist-picture'), (req, res) => {
  const name = req.body['playlist-name'];
  const description = req.body['playlist-description'];
  const file = (req as any).file;
  const creationDate = new Date().getTime();
  const userId = dLoader.loggedUser.__id;
  const id = uuid.v4();

  let filePath;

  if (file) {
    const extension = file['mimetype'].split('image/')[1];
    filePath = '/assets/uploads/' + name + '.' + extension;
  } else {
    filePath = req.body.pictureUrl;
  }

  Playlist.create(
    {
      name: name,
      picture: filePath,
      description: description,
      musics: [],
      createdAt: creationDate,
      createdBy: userId,
      __id: id,
    },
    error => {
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
  databaseHandler.updateDocument(Playlist, playlistId, jsonUpdate).then(() => {
    databaseHandler.getCollectionContent(Playlist).then(async playlists => {
      const currentPlaylist = await databaseHandler.findOneInDocument(Playlist, '__id', playlistId);
      res.status(200).json({
        playlists: playlists,
        currentPlaylist: currentPlaylist[0],
      });
    });
  });
});

app.use(apiRouter());
app.use(staticsRouter());
app.use(pagesRouter());

mongoose.connection.once('open', function() {
  console.log('Connected to database');
  dLoader.loadData(startServer);
});
