"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDB = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas");
exports.cleanDB = () => {
    db_1.default.getCollectionContent(schemas_1.MusicSchema).then(musics => {
        musics.forEach(music => {
            if (!fs_1.default.existsSync(music.path)) {
            }
        });
    });
};
//# sourceMappingURL=CleanDB.js.map