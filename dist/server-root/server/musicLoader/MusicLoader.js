"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../config");
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas/");
const filesReader_1 = tslib_1.__importDefault(require("../filesReader"));
const routes_1 = require("../routes");
const CreateMusic_1 = require("./CreateMusic");
const CreateOrUpdateArtist_1 = require("./CreateOrUpdateArtist");
const CreateOrUpdateAlbum_1 = require("./CreateOrUpdateAlbum");
class MusicLoader {
    constructor() {
        this.musicsQueue = [];
        this.artistsQueue = [];
        this.albumsQueue = [];
        this.pushInMusicsQueue = (musicId, folder) => {
            this.musicsQueue.push([musicId, folder]);
        };
        this.processQueues = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.processMusicsQueue();
            yield this.processArtistsQueue();
            yield this.processAlbumsQueue();
            this.artistsQueue = [];
            this.albumsQueue = [];
            this.musicsQueue = [];
            const musics = yield db_1.default.getCollectionContent(schemas_1.MusicSchema);
            const artists = yield db_1.default.getCollectionContent(schemas_1.ArtistSchema);
            const albums = yield db_1.default.getCollectionContent(schemas_1.AlbumSchema);
            config_1.io.emit('sync_end');
            config_1.io.emit('refresh_all', {
                musics: musics,
                artists: artists,
                albums: albums,
            });
        });
        this.processMusicsQueue = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.musicsQueue.length; i++) {
                const [path, folder] = this.musicsQueue[i];
                const results = yield db_1.default.findOneInDocument(schemas_1.MusicSchema, 'path', path);
                const musicInfo = yield filesReader_1.default.getMetadataAndAddToDB(path, folder);
                if (musicInfo) {
                    const { music, artists, album } = musicInfo;
                    if (results && results.length == 0) {
                        this.artistsQueue.push([music.__id, artists[0]]);
                        this.albumsQueue.push([music.__id, album, artists[0]]);
                        yield CreateMusic_1.addMusic(music, artists[0], album);
                    }
                    else {
                        routes_1.addMusicRoute(results[0]);
                    }
                }
            }
        });
        this.processArtistsQueue = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.artistsQueue.length; i++) {
                const [musicId, artistName] = this.artistsQueue[i];
                yield CreateOrUpdateArtist_1.createArtist(musicId, artistName);
            }
        });
        this.processAlbumsQueue = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.albumsQueue.length; i++) {
                const [musicId, albumName, artistName] = this.albumsQueue[i];
                yield CreateOrUpdateAlbum_1.createAlbum(musicId, albumName, artistName);
            }
        });
    }
}
exports.default = new MusicLoader();
//# sourceMappingURL=MusicLoader.js.map