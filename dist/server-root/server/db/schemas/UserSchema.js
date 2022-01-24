"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    selected: Boolean,
    picture: String,
    musicPaths: [String],
    history: [String],
    favorites: [String],
    __id: { type: String, unique: true },
    settings: {
        language: String,
        internetUsage: Boolean,
        localStorageUsage: Boolean,
    },
});
exports.UserSchema = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=UserSchema.js.map