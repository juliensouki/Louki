"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMusic = exports.cleanDB = void 0;
const tslib_1 = require("tslib");
const MusicLoader_1 = tslib_1.__importDefault(require("./MusicLoader"));
const CleanDB_1 = require("./CleanDB");
Object.defineProperty(exports, "cleanDB", { enumerable: true, get: function () { return CleanDB_1.cleanDB; } });
const DeleteMusic_1 = require("./DeleteMusic");
Object.defineProperty(exports, "deleteMusic", { enumerable: true, get: function () { return DeleteMusic_1.deleteMusic; } });
exports.default = MusicLoader_1.default;
//# sourceMappingURL=index.js.map