"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMusic = void 0;
const tslib_1 = require("tslib");
const sha1_1 = tslib_1.__importDefault(require("sha1"));
const logger_1 = tslib_1.__importStar(require("../logger"));
const schemas_1 = require("../db/schemas");
const routes_1 = require("../routes");
exports.addMusic = (values, artistName, albumName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (artistName == undefined) {
        artistName = '';
    }
    if (albumName == undefined) {
        albumName = '';
    }
    const artistId = artistName == undefined ? '' : sha1_1.default(artistName);
    const albumId = albumName == undefined ? '' : sha1_1.default(albumName);
    try {
        const music = yield schemas_1.MusicSchema.create(Object.assign(Object.assign({}, values), { artist: artistId, album: albumId }));
        routes_1.addMusicRoute(music);
        logger_1.default.info('Added music ' + values.__id);
    }
    catch (err) {
        logger_1.logError(err);
    }
});
//# sourceMappingURL=CreateMusic.js.map