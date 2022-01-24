"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TIMELAPSE_BETWEEN_MUSICS = exports.supportedAudioFormats = exports.checkEnv = exports.WEBPACK_PORT = exports.SERVER_PORT = exports.VERSION = exports.IS_DEV = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const find_up_1 = tslib_1.__importDefault(require("find-up"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
dotenv_1.default.config({ path: find_up_1.default.sync('.env') });
const IS_DEV = process.env.NODE_ENV !== 'production';
exports.IS_DEV = IS_DEV;
const packageJsonPath = path_1.default.join(process.cwd(), 'package.json');
const rawPackageJson = fs_1.default.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);
const { version: VERSION } = PackageJson;
exports.VERSION = VERSION;
const SERVER_PORT = process.env.PORT || 3000;
exports.SERVER_PORT = SERVER_PORT;
const WEBPACK_PORT = 8085;
exports.WEBPACK_PORT = WEBPACK_PORT;
const MAX_TIMELAPSE_BETWEEN_MUSICS = 1000;
exports.MAX_TIMELAPSE_BETWEEN_MUSICS = MAX_TIMELAPSE_BETWEEN_MUSICS;
const checkEnv = () => {
    console.log('-------------------------- CONFIGURATION -------------------------------');
    if (!process.env.DATABASE_URL) {
        console.log(`Environment error : DATABASE_URL is missing in your .env file. Exiting Louki now.`);
        process.exit();
    }
    const writeLogsInFile = process.env.LOG_FOLDER;
    const pixabayKeyExists = process.env.PIXABAY_API_KEY !== undefined;
    const webpackPolling = process.env.WEBPACK__WATCH__USE_POLLING === 'true';
    const logsText = writeLogsInFile
        ? `Logs will be written in the following folder : ${process.env.LOG_FOLDER}.`
        : `Logs won't be written in any file. Set LOG_FOLDER in your .env to turn this feature on.`;
    console.log(logsText);
    console.log(`Pixabay API KEY : ${pixabayKeyExists}`);
    console.log(`Webpack polling feature : ${webpackPolling}`);
    console.log('----------------------- END OF CONFIGURATION ---------------------------');
    return true;
};
exports.checkEnv = checkEnv;
const supportedAudioFormats = ['mp3', 'ogg', 'wav'];
exports.supportedAudioFormats = supportedAudioFormats;
//# sourceMappingURL=config.js.map