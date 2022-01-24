"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const schemas_1 = require("../db/schemas");
const manifest_manager_1 = require("./manifest-manager");
function pagesRouter(db) {
    const router = express_1.Router();
    router.get('/api/v1/music/:id', (req, res) => {
        const id = req.params.id;
        db.findOneInDocument(schemas_1.MusicSchema, '__id', id).then(musics => {
            if (musics && musics.length > 0) {
                res.sendFile(musics[0].path);
            }
        });
    });
    router.get(`/**`, (_, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const manifest = yield manifest_manager_1.getManifest();
        res.render('page.ejs', { manifest });
    }));
    return router;
}
exports.pagesRouter = pagesRouter;
//# sourceMappingURL=pages-router.js.map