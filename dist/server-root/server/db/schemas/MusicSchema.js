"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const musicSchema = new mongoose_1.default.Schema({
    title: String,
    artist: [String],
    feat: [String],
    album: String,
    duration: Number,
    path: String,
    __id: { type: String, unique: true },
});
exports.MusicSchema = mongoose_1.default.model('Music', musicSchema);
//# sourceMappingURL=MusicSchema.js.map