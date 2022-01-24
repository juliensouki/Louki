"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtist = void 0;
const tslib_1 = require("tslib");
const sha1_1 = tslib_1.__importDefault(require("sha1"));
const logger_1 = tslib_1.__importDefault(require("../logger"));
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas");
exports.createArtist = (musicId, artistName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (artistName == undefined)
        return;
    const artistId = sha1_1.default(artistName);
    if (artistName == '' || artistId == '')
        return;
    const artist = new schemas_1.ArtistSchema({
        name: artistName,
        __id: artistId,
        musics: [musicId],
    });
    try {
        yield artist.save();
        logger_1.default.info('Artist ' + artistName + ' was created');
    }
    catch (err) {
        yield addMusicToArtist(artistId, musicId);
    }
});
const addMusicToArtist = (artistId, musicId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.addToArray(schemas_1.ArtistSchema, '__id', artistId, 'musics', musicId);
    logger_1.default.info('Adding music ' + musicId + ' to artist ' + artistId);
});
//# sourceMappingURL=CreateOrUpdateArtist.js.map