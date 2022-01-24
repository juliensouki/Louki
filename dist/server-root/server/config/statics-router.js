"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticsRouter = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const express_1 = tslib_1.__importDefault(require("express"));
const express_2 = require("express");
const config_1 = require("./config");
const http_proxy_middleware_1 = tslib_1.__importDefault(require("http-proxy-middleware"));
function staticsRouter() {
    const router = express_2.Router();
    if (config_1.IS_DEV) {
        router.use('/statics', http_proxy_middleware_1.default({
            target: `http://localhost:${config_1.WEBPACK_PORT}/`,
        }));
    }
    else {
        const staticsPath = path_1.default.join(process.cwd(), 'dist', 'statics');
        router.use('/statics', express_1.default.static(staticsPath));
    }
    return router;
}
exports.staticsRouter = staticsRouter;
//# sourceMappingURL=statics-router.js.map