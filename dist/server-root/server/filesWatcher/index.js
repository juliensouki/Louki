"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chokidar_1 = tslib_1.__importDefault(require("chokidar"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const config_1 = require("../config");
const musicLoader_1 = tslib_1.__importStar(require("../musicLoader"));
const schemas_1 = require("../db/schemas/");
const logger_1 = tslib_1.__importStar(require("../logger"));
const db_1 = tslib_1.__importDefault(require("../db"));
class FilesWatcher {
    constructor() {
        this.watchersMap = new Map();
        this.newMusicsLoading = false;
        this.lastAddedMusicTime = null;
        this.currentUser = null;
        this.loadData = (callback) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.currentUser = (yield db_1.default.findOneInDocument(schemas_1.UserSchema, 'selected', true))[0];
                musicLoader_1.cleanDB();
                this.watchUserFolders();
                callback(config_1.pagesRouter(db_1.default));
            }
            catch (err) {
                logger_1.logError(err);
                callback(config_1.MongoDBErrorRouter());
            }
        });
        this.detectDeletedSong = (path) => {
            db_1.default.findOneInDocument(schemas_1.MusicSchema, 'path', path).then(music => {
                if (music && music.length > 0) {
                    musicLoader_1.deleteMusic(music[0]);
                }
                else {
                    this.detectDeletedSong(path.split('/').join('\\'));
                }
            });
        };
        this.unwatchFolder = (folder) => {
            logger_1.default.info('unwatch ' + folder);
            const watcher = this.watchersMap.get(folder);
            if (watcher) {
                watcher.close();
                this.watchersMap.delete(folder);
                fs_1.default.readdirSync(folder).forEach(file => {
                    this.detectDeletedSong(folder + file);
                });
            }
        };
        this.buildWatchArray = (folder) => {
            const array = [];
            config_1.config.supportedAudioFormats.forEach(extension => {
                array.push(`${folder}/*.${extension}`);
            });
            return array;
        };
        this.howLongSinceLastMusicAdded = () => {
            const timeSinceLastAddedMusic = +new Date() - +this.lastAddedMusicTime;
            if (timeSinceLastAddedMusic > config_1.config.MAX_TIMELAPSE_BETWEEN_MUSICS) {
                clearInterval(this.interval);
                this.newMusicsLoading = false;
                musicLoader_1.default.processQueues();
            }
        };
        this.newMusicDetected = (path, folder) => {
            if (this.newMusicsLoading == false) {
                this.newMusicsLoading = true;
                config_1.io.emit('sync_start');
                this.interval = setInterval(this.howLongSinceLastMusicAdded, 100);
            }
            this.lastAddedMusicTime = new Date();
            musicLoader_1.default.pushInMusicsQueue(path, folder);
        };
        this.setWatchersForFolder = (folder) => {
            const fileWatcher = chokidar_1.default.watch('file', {
                ignored: /(^|[\/\\])\../,
                persistent: true,
                depth: 1,
            });
            this.watchersMap.set(folder, fileWatcher);
            fileWatcher.add(this.buildWatchArray(folder));
            logger_1.default.info('watching : ' + folder);
            fileWatcher.on('add', (path) => {
                this.newMusicDetected(path, folder);
            });
            fileWatcher.on('unlink', (deletedSongPath) => {
                this.detectDeletedSong(deletedSongPath);
            });
        };
        this.watchUserFolders = () => {
            this.currentUser.musicPaths.forEach((userPath) => {
                this.setWatchersForFolder(userPath);
            });
        };
    }
}
exports.default = new FilesWatcher();
//# sourceMappingURL=index.js.map