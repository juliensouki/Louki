"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMusicFromArtist = exports.deleteArtist = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const logger_1 = tslib_1.__importDefault(require("../logger"));
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas");
exports.deleteArtist = (id) => {
    db_1.default.deleteFromDocument(schemas_1.ArtistSchema, '__id', id).then(() => {
        logger_1.default.info('Deleted artist ' + id);
        db_1.default.getCollectionContent(schemas_1.ArtistSchema).then(artists => {
            config_1.io.sockets.emit('refresh_artists', artists);
        });
    });
};
exports.removeMusicFromArtist = (artistId, musicId) => {
    db_1.default.removeFromArray(schemas_1.ArtistSchema, '__id', artistId, 'musics', musicId).then(artists => {
        logger_1.default.info('Removing song ' + musicId + ' from artist ' + artistId);
        const sendToClient = {
            id: artistId,
            data: artists,
        };
        config_1.io.sockets.emit('udpate_artist', sendToClient);
    });
};
//# sourceMappingURL=DeleteOrUpdateArtist.js.map