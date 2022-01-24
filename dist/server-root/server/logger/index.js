"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const simple_node_logger_1 = tslib_1.__importDefault(require("simple-node-logger"));
const opts = process.env.LOG_FOLDER
    ? {
        errorEventName: 'Server error',
        logDirectory: process.env.LOG_FOLDER,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
        fileNamePattern: 'louki.log',
    }
    : {
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
    };
const doesFileExist = process.env.LOG_FILE ? fs_1.default.existsSync(process.env.LOG_FOLDER) : false;
const logger = process.env.LOG_FOLDER && doesFileExist
    ? simple_node_logger_1.default.createRollingFileLogger(opts)
    : simple_node_logger_1.default.createSimpleLogger(opts);
exports.logError = (error) => {
    logger.error(`${error.name} : ${error.message}`);
};
exports.default = logger;
//# sourceMappingURL=index.js.map