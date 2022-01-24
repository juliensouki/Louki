"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const playlistSchema = new mongoose_1.default.Schema({
    name: String,
    picture: String,
    description: String,
    musics: [String],
    createdAt: Date,
    createdBy: Number,
    __id: { type: String, unique: true },
});
exports.PlaylistSchema = mongoose_1.default.model('playlist', playlistSchema);
//# sourceMappingURL=PlaylistSchema.js.map