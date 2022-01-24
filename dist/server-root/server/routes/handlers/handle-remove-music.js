"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRemoveMusic = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleRemoveMusic = (req, res) => {
    const { playlistId } = req.params;
    const { musicId } = req.body;
    db_1.default.removeFromArray(schemas_1.PlaylistSchema, '__id', playlistId, 'musics', musicId).then(playlist => {
        const response = playlist;
        res.status(200).send(response);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-remove-music.js.map