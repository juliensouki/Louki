"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const albumSchema = new mongoose_1.default.Schema({
    title: String,
    __id: { type: String, unique: true },
    musics: [String],
    author: String,
}, { emitIndexErrors: true });
exports.AlbumSchema = mongoose_1.default.model('Album', albumSchema);
//# sourceMappingURL=AlbumSchema.js.map