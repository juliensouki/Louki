"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMusic = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const db_1 = tslib_1.__importDefault(require("../db"));
const logger_1 = tslib_1.__importDefault(require("../logger"));
const schemas_1 = require("../db/schemas");
const DeleteOrUpdateArtist_1 = require("./DeleteOrUpdateArtist");
const DeleteOrUpdateAlbum_1 = require("./DeleteOrUpdateAlbum");
exports.deleteMusic = (music) => {
    db_1.default.deleteFromDocument(schemas_1.MusicSchema, '__id', music.__id).then(() => {
        logger_1.default.info('Deleted music ' + music.title);
        db_1.default.getCollectionContent(schemas_1.MusicSchema).then((musics) => {
            config_1.io.sockets.emit('refresh_musics', musics);
        });
        db_1.default.findOneInDocument(schemas_1.MusicSchema, 'artist', music.artist).then((musics) => {
            if (musics.length == 0) {
                DeleteOrUpdateArtist_1.deleteArtist(music.artist);
            }
            else {
                DeleteOrUpdateArtist_1.removeMusicFromArtist(music.artist, music.__id);
            }
        });
        db_1.default.findOneInDocument(schemas_1.MusicSchema, 'artist', music.album).then((musics) => {
            if (musics.length == 0) {
                DeleteOrUpdateAlbum_1.deleteAlbum(music.album);
            }
            else {
                DeleteOrUpdateAlbum_1.removeMusicFromAlbum(music.album, music.__id);
            }
        });
    });
};
//# sourceMappingURL=DeleteMusic.js.map