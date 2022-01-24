"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReset = void 0;
const schemas_1 = require("../../db/schemas");
exports.handleReset = (req, res) => {
    const promises = [
        schemas_1.UserSchema.deleteMany({}),
        schemas_1.MusicSchema.deleteMany({}),
        schemas_1.PlaylistSchema.deleteMany({}),
        schemas_1.ArtistSchema.deleteMany({}),
        schemas_1.AlbumSchema.deleteMany({}),
    ];
    Promise.all(promises).then(() => {
        res.status(204).send();
    });
};
//# sourceMappingURL=handle-reset.js.map