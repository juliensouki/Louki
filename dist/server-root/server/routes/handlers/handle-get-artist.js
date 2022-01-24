"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetArtist = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleGetArtist = (req, res) => {
    const id = req.params.artistId;
    db_1.default.findOneInDocument(schemas_1.ArtistSchema, '__id', id).then(value => {
        if (value && value.length > 0) {
            const response = value[0];
            res.status(200).send(response);
        }
        else {
            const response = {
                name: `Get artist error`,
                message: `Couldn't get artist from id ${id}`,
            };
            logger_1.logError(response);
            res.status(500).send(response);
        }
    });
};
//# sourceMappingURL=handle-get-artist.js.map