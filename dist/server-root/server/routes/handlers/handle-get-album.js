"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAlbum = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleGetAlbum = (req, res) => {
    const id = req.params.albumId;
    db_1.default.findOneInDocument(schemas_1.AlbumSchema, '__id', id).then(albums => {
        if (albums && albums.length > 0) {
            const response = albums[0];
            res.status(200).send(response);
        }
        else {
            const response = {
                name: `Get album error`,
                message: `Couldn't get album for id ${id}`,
            };
            logger_1.logError(response);
            res.status(500).send(response);
        }
    });
};
//# sourceMappingURL=handle-get-album.js.map