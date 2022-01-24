"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTestSetup = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleTestSetup = (req, res) => {
    db_1.default.findOneInDocument(schemas_1.UserSchema, 'selected', true).then(users => {
        const response = users && users.length > 0;
        res.status(200).send(response);
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-test-setup.js.map