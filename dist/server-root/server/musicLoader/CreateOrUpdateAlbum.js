"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbum = void 0;
const tslib_1 = require("tslib");
const sha1_1 = tslib_1.__importDefault(require("sha1"));
const logger_1 = tslib_1.__importDefault(require("../logger"));
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas");
exports.createAlbum = (musicId, albumName, artistName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (albumName == undefined || artistName == undefined)
        return;
    const albumId = sha1_1.default(albumName);
    const artistId = sha1_1.default(artistName);
    if (albumName == '' || albumId == '')
        return;
    const album = new schemas_1.AlbumSchema({
        title: albumName,
        author: artistId,
        __id: albumId,
        musics: [musicId],
    });
    try {
        yield album.save();
        logger_1.default.info('Album ' + albumName + ' was created');
    }
    catch (err) {
        yield addMusicToAlbum(albumId, musicId);
    }
});
const addMusicToAlbum = (albumId, musicId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.addToArray(schemas_1.AlbumSchema, '__id', albumId, 'musics', musicId);
    logger_1.default.info('Adding music ' + musicId + ' to album ' + albumId);
});
//# sourceMappingURL=CreateOrUpdateAlbum.js.map