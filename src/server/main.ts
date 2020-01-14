import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';

import * as config from './config';

import databaseHandler from './db';
import dataLoader from './dataLoader';

const app = express();
const dLoader = new dataLoader(databaseHandler);

app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use('/musics', express.static(path.join(process.cwd(), 'musics')));
app.use('/musics2', express.static(path.join(process.cwd(), 'musics2')));

databaseHandler.connect();

const startServer = () => {
  app.listen(config.SERVER_PORT, () => {
    console.log(`App listening on port ${config.SERVER_PORT}!`);
  });
};

app.get('/currentUser', (req, res) => {
  const user = dLoader.get('currentUser');
  res.json(user);
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

app.use(apiRouter());
app.use(staticsRouter());
app.use(pagesRouter());

mongoose.connection.once('open', function() {
  console.log('Connected to database');
  dLoader.loadData(startServer);
});
