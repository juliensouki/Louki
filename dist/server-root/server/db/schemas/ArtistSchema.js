"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const artistSchema = new mongoose_1.default.Schema({
    name: String,
    __id: { type: String, unique: true },
    musics: [String],
}, { emitIndexErrors: true });
exports.ArtistSchema = mongoose_1.default.model('Artist', artistSchema);
//# sourceMappingURL=ArtistSchema.js.map