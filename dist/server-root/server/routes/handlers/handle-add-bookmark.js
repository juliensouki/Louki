"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddBookmark = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleAddBookmark = (req, res) => {
    const id = req.body.musicId;
    db_1.default.addToArray(schemas_1.UserSchema, 'selected', true, 'favorites', id).then(user => {
        const response = user.favorites;
        res.status(200).send(response);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-add-bookmark.js.map