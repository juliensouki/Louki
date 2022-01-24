"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdatePlaylist = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleUpdatePlaylist = (req, res) => {
    const { playlistId } = req.params;
    const { playlistName, playlistDescription } = req.body;
    const jsonUpdate = {
        name: playlistName,
        description: playlistDescription,
    };
    db_1.default.updateDocument(schemas_1.PlaylistSchema, playlistId, jsonUpdate).then(() => {
        db_1.default.getCollectionContent(schemas_1.PlaylistSchema).then((playlists) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (playlists && playlists.length > 0) {
                const currentPlaylist = yield db_1.default.findOneInDocument(schemas_1.PlaylistSchema, '__id', playlistId);
                const response = {
                    playlists: playlists,
                    currentPlaylist: currentPlaylist[0],
                };
                res.status(200).send(response);
            }
            else {
                const response = {
                    name: `Update playlist error`,
                    message: `Unable to get current playlist`,
                };
                logger_1.logError(response);
                res.status(500).send(response);
            }
        }), error => {
            logger_1.logError(error);
            res.status(500).send(error);
        });
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-update-playlist.js.map