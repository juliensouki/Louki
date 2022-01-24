"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreatePlaylist = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const request_1 = tslib_1.__importDefault(require("request"));
const db_1 = tslib_1.__importDefault(require("../../db"));
const schemas_1 = require("../../db/schemas");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const logger_1 = require("../../logger");
const download = function (uri, filename, callback) {
    request_1.default.head(uri, () => {
        request_1.default(uri)
            .pipe(fs_1.default.createWriteStream(filename))
            .on('close', callback);
    });
};
exports.handleCreatePlaylist = (req, res) => {
    const name = req.body['playlist-name'];
    const description = req.body['playlist-description'];
    const file = req.file;
    const creationDate = new Date().getTime();
    const id = uuid_1.default.v4();
    try {
        let filePath;
        if (file) {
            const extension = file['mimetype'].split('image/')[1];
            filePath = `/assets/uploads/${name}.${extension}`;
        }
        else if (req.body.pictureUrl) {
            filePath = `/assets/uploads/${name}`;
            download(req.body.pictureUrl, `.${filePath}`, () => { });
        }
        schemas_1.PlaylistSchema.create({
            name: name,
            picture: filePath,
            description: description,
            musics: [],
            createdAt: creationDate,
            __id: id,
        }, () => {
            db_1.default.getCollectionContent(schemas_1.PlaylistSchema).then((response) => {
                res.status(200).send(response);
            }, error => {
                logger_1.logError(error);
                res.status(500).send(error.message);
            });
        });
    }
    catch (e) {
        logger_1.logError(e);
        res.status(500).send('Unable to create playlist');
    }
};
//# sourceMappingURL=handle-create-playlist.js.map