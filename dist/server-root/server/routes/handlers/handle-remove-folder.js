"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRemoveFolder = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
const filesWatcher_1 = tslib_1.__importDefault(require("../../filesWatcher"));
exports.handleRemoveFolder = (req, res) => {
    const { folder } = req.body;
    db_1.default.removeFromArray(schemas_1.UserSchema, 'selected', true, 'musicPaths', folder).then(user => {
        filesWatcher_1.default.unwatchFolder(folder);
        const response = user;
        res.status(200).send(response);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-remove-folder.js.map