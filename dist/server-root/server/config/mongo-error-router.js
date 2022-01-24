"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBErrorRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const manifest_manager_1 = require("./manifest-manager");
function MongoDBErrorRouter() {
    const router = express_1.Router();
    router.get(`/**`, (_, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const manifest = yield manifest_manager_1.getManifest();
        res.render('mongo-error.ejs', { manifest });
    }));
    return router;
}
exports.MongoDBErrorRouter = MongoDBErrorRouter;
//# sourceMappingURL=mongo-error-router.js.map