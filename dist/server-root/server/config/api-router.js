"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const tslib_1 = require("tslib");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const express_1 = require("express");
function apiRouter() {
    const router = express_1.Router();
    router.use(body_parser_1.default.json());
    return router;
}
exports.apiRouter = apiRouter;
//# sourceMappingURL=api-router.js.map