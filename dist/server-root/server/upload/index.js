"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePictureStorage = exports.playlistPictureStorage = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../db"));
const schemas_1 = require("../db/schemas");
exports.playlistPictureStorage = {
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads/');
    },
    filename: (req, file, cb) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.default.findOneInDocument(schemas_1.UserSchema, 'selected', true);
        let name = '0';
        if (user && user[0]) {
            name = user[0].__id;
        }
        const extension = file['mimetype'].split('image/')[1];
        cb(null, name + '.' + extension);
    }),
};
exports.profilePictureStorage = {
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads/');
    },
    filename: (req, file, cb) => {
        const name = req.body['playlist-name'];
        const extension = file['mimetype'].split('image/')[1];
        cb(null, name + '.' + extension);
    },
};
//# sourceMappingURL=index.js.map