import { Router } from 'express';
import chokidar from 'chokidar';
import fs from 'fs';

import { config, pagesRouter, MongoDBErrorRouter, io } from '../config';
import MusicLoader, { cleanDB, deleteMusic } from '../musicLoader';
import { UserSchema, MusicSchema } from '../db/schemas/';
import logger, { logError } from '../logger';
import db from '../db';

class FilesWatcher {
  private watchersMap: any = new Map<string, chokidar.FSWatcher>();

  private newMusicsLoading: boolean = false;
  private lastAddedMusicTime: Date | null = null;
  private interval: ReturnType<typeof setInterval>;

  private currentUser: any = null;

  loadData = async (callback: (router: Router) => void): Promise<void> => {
    try {
      this.currentUser = (await db.findOneInDocument(UserSchema, 'selected', true))[0];
      cleanDB();
      this.watchUserFolders();
      callback(pagesRouter(db));
    } catch (err) {
      logError(err);
      callback(MongoDBErrorRouter());
    }
  };

  detectDeletedSong = (path: string): void => {
    db.findOneInDocument(MusicSchema, 'path', path).then(music => {
      if (music && music.length > 0) {
        deleteMusic(music[0]);
      } else {
        //Windows paths (\ instead of /)
        this.detectDeletedSong(path.split('/').join('\\'));
      }
    });
  };

  unwatchFolder = (folder: string): void => {
    logger.info('unwatch ' + folder);
    const watcher: chokidar.FSWatcher = this.watchersMap.get(folder);
    if (watcher) {
      watcher.close();
      this.watchersMap.delete(folder);
      fs.readdirSync(folder).forEach(file => {
        this.detectDeletedSong(folder + file);
      });
    }
  };

  buildWatchArray = (folder: string): Array<string> => {
    const array: Array<string> = [];
    config.supportedAudioFormats.forEach(extension => {
      array.push(`${folder}/*.${extension}`);
    });
    return array;
  };

  howLongSinceLastMusicAdded = (): void => {
    const timeSinceLastAddedMusic = +new Date() - +this.lastAddedMusicTime;
    if (timeSinceLastAddedMusic > config.MAX_TIMELAPSE_BETWEEN_MUSICS) {
      clearInterval(this.interval);
      this.newMusicsLoading = false;
      MusicLoader.processQueues();
    }
  };

  newMusicDetected = (path: string, folder: string): void => {
    if (this.newMusicsLoading == false) {
      this.newMusicsLoading = true;
      io.emit('sync_start');
      this.interval = setInterval(this.howLongSinceLastMusicAdded, 100);
    }
    this.lastAddedMusicTime = new Date();
    MusicLoader.pushInMusicsQueue(path, folder);
  };

  setWatchersForFolder = (folder: string): void => {
    const fileWatcher = chokidar.watch('file', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      depth: 1,
    });

    this.watchersMap.set(folder, fileWatcher);
    fileWatcher.add(this.buildWatchArray(folder));
    logger.info('watching : ' + folder);

    fileWatcher.on('add', (path: string) => {
      this.newMusicDetected(path, folder);
    });

    fileWatcher.on('unlink', (deletedSongPath: string) => {
      this.detectDeletedSong(deletedSongPath);
    });
  };

  watchUserFolders = (): void => {
    this.currentUser.musicPaths.forEach((userPath: string) => {
      this.setWatchersForFolder(userPath);
    });
  };
}

export default new FilesWatcher();
