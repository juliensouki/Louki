"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddFolder = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
const filesWatcher_1 = tslib_1.__importDefault(require("../../filesWatcher"));
exports.handleAddFolder = (req, res) => {
    const { folder } = req.body;
    if (fs_1.default.existsSync(folder)) {
        db_1.default.addToArray(schemas_1.UserSchema, 'selected', true, 'musicPaths', folder).then(user => {
            filesWatcher_1.default.setWatchersForFolder(folder);
            const response = user;
            res.status(200).send(response);
        }, error => {
            logger_1.logError(error);
            res.status(500).send(error);
        });
    }
    else {
        const response = {
            name: `Add folder error`,
            message: `Folder ${folder} does not exist`,
        };
        res.status(422).send(response);
    }
};
//# sourceMappingURL=handle-add-folder.js.map