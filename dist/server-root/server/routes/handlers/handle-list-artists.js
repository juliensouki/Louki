"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleListArtists = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleListArtists = (req, res) => {
    db_1.default.getCollectionContent(schemas_1.ArtistSchema).then((artists) => {
        res.status(200).send(artists);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-list-artists.js.map