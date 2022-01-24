"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeletePlaylist = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleDeletePlaylist = (req, res) => {
    const { playlistId } = req.params;
    db_1.default.deleteFromDocument(schemas_1.PlaylistSchema, '__id', playlistId).then(() => {
        db_1.default.getCollectionContent(schemas_1.PlaylistSchema).then((response) => {
            res.status(200).send(response);
        }, error => {
            logger_1.logError(error);
            res.status(500).send(error.message);
        });
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error.message);
    });
};
//# sourceMappingURL=handle-delete-playlist.js.map