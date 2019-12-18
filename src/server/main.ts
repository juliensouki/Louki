import express from 'express';
import path from 'path';
import mongoose = require("mongoose");
import { apiRouter } from './routes/api-router';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import * as config from './config';
import databaseHandler from './db/db';

const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use(apiRouter());
app.use(staticsRouter());
app.use(pagesRouter());

databaseHandler.connect();

//ORDER TO LOAD DADA :
//  --> GET ALL MUSICS | ONCE WE HAVE THOSE TWO DATA
//  --> GET ALL USERS  | WE CAN DO WHAT IS UNDER

// -------------------------------------------------

//STEP 1 : ONCE ALL MUSICS WHERE LOADED FROM DATABASE, CHECK IF THEY EXIST
//STEP 2 : DELETE MUSICS THAT DON'T EXIST ANYMORE
//STEP 3 : GET ALL FILES IN FOLDERS AND IF NOT IN DATABASE ADD THEM
//STEP 4 : WHEN WE ADD A MUSIC TO THE DB, WE NEED TO CHECK FOR FILES METADATA 

// ---------------IN THE MAIN TIME -----------------

//  --> GET ALL PLAYLISTS
//  --> GET ALL ALBUMS
//  --> GET ALL ARTISTS


//WRITE CLASS GET MUSICS
const loadAllMusic = (paths: Array<string>) => {
  paths.forEach(path => {
    fs.readdir("/home/souki/projects/Louki/" + path, (err, files) => {
      if (files && files.length > 0)
      {
        files.forEach(file => {
          console.log(file);
        });
      }
    });
  });
}

mongoose.connection.once('open', function () {
  console.log("Connected to database");
  databaseHandler.getAllData();
  databaseHandler.getUsers(loadAllMusic);
});

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`);
});