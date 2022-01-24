"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateSettings = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleUpdateSettings = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const settings = JSON.parse(req.body.settings);
    const file = req.file;
    const user = (yield db_1.default.findOneInDocument(schemas_1.UserSchema, 'selected', true))[0];
    const newAccountSettings = {
        language: settings.language,
        internetUsage: settings.internetUsage,
        localStorageUsage: settings.localStorageUsage,
    };
    const jsonUpdate = {
        name: settings.username,
        picture: file ? `/assets/uploads/${user.__id}.${file['mimetype'].split('image/')[1]}` : user.picture,
        settings: newAccountSettings,
    };
    db_1.default.updateDocument(schemas_1.UserSchema, user.__id, jsonUpdate).then(user => {
        const response = user;
        res.status(200).send(response);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
});
//# sourceMappingURL=handle-update-settings.js.map