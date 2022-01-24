"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSetupLouki = void 0;
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleSetupLouki = (req, res) => {
    const file = req.file;
    const id = 0;
    schemas_1.UserSchema.create({
        name: req.body.username,
        picture: file ? `/assets/uploads/${id}.${file['mimetype'].split('image/')[1]}` : '',
        selected: true,
        __id: 0,
        settings: {
            language: 'english',
            localStorageUsage: req.body['local-storage-usage'] === 'true',
            internetUsage: true,
        },
    }).then((response) => {
        res.status(200).send(response);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-setup-louki.js.map