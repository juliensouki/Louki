"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetCurrentUser = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const logger_1 = require("../../logger");
exports.handleGetCurrentUser = (req, res) => {
    db_1.default.findOneInDocument(schemas_1.UserSchema, 'selected', true).then(users => {
        if (users && users.length > 0) {
            const response = users[0];
            res.status(200).send(response);
        }
        else {
            const response = {
                name: `Get user error`,
                message: `Couldn't get current user`,
            };
            logger_1.logError(response);
            res.status(500).send(response);
        }
    }, error => {
        logger_1.logError(error);
        res.status(500).send(error);
    });
};
//# sourceMappingURL=handle-get-current-user.js.map