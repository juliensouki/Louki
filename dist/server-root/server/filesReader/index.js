"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../config/config");
const logger_1 = require("../logger");
const mm = tslib_1.__importStar(require("music-metadata"));
const uuid_1 = tslib_1.__importDefault(require("uuid"));
class FilesReader {
    constructor() {
        this.getFieldInMetadata = (metadata, fieldName) => {
            let currentlevel = metadata;
            for (let i = 0; i < fieldName.length; i++) {
                if (!currentlevel[fieldName[i]])
                    return '';
                currentlevel = currentlevel[fieldName[i]];
            }
            return currentlevel;
        };
        this.getMetadataAndAddToDB = (music, folder) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const m = yield mm.parseFile(music);
                const metadata = {
                    music: {
                        title: this.getFieldInMetadata(m, ['common', 'title']),
                        artist: '',
                        album: '',
                        path: music,
                        __id: uuid_1.default.v4(),
                        duration: this.getFieldInMetadata(m, ['format', 'duration']),
                    },
                    artists: this.getFieldInMetadata(m, ['common', 'artists']),
                    album: this.getFieldInMetadata(m, ['common', 'album']),
                };
                if (metadata.music.title == undefined || metadata.music.title == null || metadata.music.title == '') {
                    metadata.music.title = music;
                }
                config_1.supportedAudioFormats.forEach(extension => {
                    metadata.music.title = metadata.music.title.replace(folder, '').replace(`.${extension}`, '');
                    metadata.music.title = metadata.music.title.replace(folder.split('/').join('\\'), '');
                });
                return metadata;
            }
            catch (err) {
                logger_1.logError({
                    name: `File reader error`,
                    message: err.message,
                });
                return null;
            }
        });
    }
}
exports.default = new FilesReader();
//# sourceMappingURL=index.js.map