"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMusicFromAlbum = exports.deleteAlbum = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const logger_1 = tslib_1.__importDefault(require("../logger"));
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas");
exports.deleteAlbum = (id) => {
    db_1.default.deleteFromDocument(schemas_1.AlbumSchema, '__id', id).then(() => {
        logger_1.default.info('Deleted album ' + id);
        db_1.default.getCollectionContent(schemas_1.AlbumSchema).then(albums => {
            config_1.io.sockets.emit('refresh_albums', albums);
        });
    });
};
exports.removeMusicFromAlbum = (albumId, musicId) => {
    db_1.default.removeFromArray(schemas_1.AlbumSchema, '__id', albumId, 'musics', musicId).then((album) => {
        logger_1.default.info('Removing song ' + musicId + ' from artist ' + albumId);
        const sendToClient = {
            id: albumId,
            data: album,
        };
        config_1.io.sockets.emit('udpate_album', sendToClient);
    });
};
//# sourceMappingURL=DeleteOrUpdateAlbum.js.map