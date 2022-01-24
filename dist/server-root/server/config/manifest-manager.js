"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifest = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const request_1 = tslib_1.__importDefault(require("request"));
const config_1 = require("./config");
function getManifestFromWebpack() {
    return new Promise((resolve, reject) => {
        request_1.default.get(`http://localhost:${config_1.WEBPACK_PORT}/statics/manifest.json`, {}, (err, data) => err ? reject(err) : resolve(data.body));
    });
}
function getManifest() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let manifestStr;
        if (config_1.IS_DEV) {
            manifestStr = yield getManifestFromWebpack();
        }
        else {
            manifestStr = fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'dist', 'statics', 'manifest.json'), 'utf-8').toString();
        }
        const manifest = JSON.parse(manifestStr);
        return manifest;
    });
}
exports.getManifest = getManifest;
//# sourceMappingURL=manifest-manager.js.map