declare const IS_DEV: boolean;
declare const VERSION: any;
declare const SERVER_PORT: string | number;
declare const WEBPACK_PORT = 8085;
declare const MAX_TIMELAPSE_BETWEEN_MUSICS = 1000;
declare const checkEnv: () => boolean;
declare const supportedAudioFormats: string[];
export { IS_DEV, VERSION, SERVER_PORT, WEBPACK_PORT, checkEnv, supportedAudioFormats, MAX_TIMELAPSE_BETWEEN_MUSICS };
