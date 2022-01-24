"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddMusic = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = tslib_1.__importStar(require("../../logger"));
exports.handleAddMusic = (req, res) => {
    const { playlistId } = req.params;
    const { musicId } = req.body;
    db_1.default.findOneInDocument(schemas_1.PlaylistSchema, '__id', playlistId).then(playlists => {
        if (playlists && playlists.length > 0) {
            if (playlists[0].musics.includes(musicId)) {
                logger_1.default.info(`music ${musicId} is already in playlist ${playlistId}`);
                res.status(403).send();
            }
            else {
                db_1.default.addToArray(schemas_1.PlaylistSchema, '__id', playlistId, 'musics', musicId).then(() => {
                    res.sendStatus(200).send();
                }, error => {
                    logger_1.logError(error);
                    res.status(500).send(error.message);
                });
            }
        }
        else {
            const response = {
                name: `Add music error`,
                message: `Unable to get playlist to check if music can be added`,
            };
            logger_1.logError(response);
            res.status(422).send(response);
        }
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error.message);
    });
};
//# sourceMappingURL=handle-add-music.js.map