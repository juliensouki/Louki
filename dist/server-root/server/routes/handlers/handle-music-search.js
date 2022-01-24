"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMusicSearch = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const leven_1 = tslib_1.__importDefault(require("leven"));
const logger_1 = require("../../logger");
exports.handleMusicSearch = (req, res) => {
    const { searchText, musics } = req.body;
    db_1.default.findMany(schemas_1.MusicSchema, '__id', musics).then(results => {
        if (results.length == 0) {
            res.status(200).send(results);
        }
        else {
            const response = [];
            results.forEach(music => {
                if (leven_1.default(searchText, music.title) < 10 || music.title.toLowerCase().includes(searchText.toLowerCase())) {
                    response.push(music.__id);
                }
            });
            res.status(200).send(response);
        }
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-music-search.js.map