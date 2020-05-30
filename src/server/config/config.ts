import dotenv from 'dotenv';
import findUp from 'find-up';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: findUp.sync('.env') });

const IS_DEV = process.env.NODE_ENV !== 'production';

const packageJsonPath = path.join(process.cwd(), 'package.json');
const rawPackageJson = fs.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);

const { version: VERSION } = PackageJson;

const SERVER_PORT = process.env.PORT || 3000;
const WEBPACK_PORT = 8085;

const MAX_TIMELAPSE_BETWEEN_MUSICS = 1000; // in milliseconds

const checkEnv = (): boolean => {
  console.log('-------------------------- CONFIGURATION -------------------------------');
  if (!process.env.DATABASE_URL) {
    console.log(`Environment error : DATABASE_URL is missing in your .env file. Exiting Louki now.`);
    process.exit();
  }

  const writeLogsInFile: string | false = process.env.LOG_FOLDER;
  const pixabayKeyExists: boolean = process.env.PIXABAY_API_KEY !== undefined;
  const webpackPolling: boolean = process.env.WEBPACK__WATCH__USE_POLLING === 'true';

  const logsText = writeLogsInFile
    ? `Logs will be written in the following folder : ${process.env.LOG_FOLDER}.`
    : `Logs won't be written in any file. Set LOG_FOLDER in your .env to turn this feature on.`;

  console.log(logsText);
  console.log(`Pixabay API KEY : ${pixabayKeyExists}`);
  console.log(`Webpack polling feature : ${webpackPolling}`);
  console.log('----------------------- END OF CONFIGURATION ---------------------------');
  return true;
};

const supportedAudioFormats = ['mp3', 'ogg', 'wav'];

export { IS_DEV, VERSION, SERVER_PORT, WEBPACK_PORT, checkEnv, supportedAudioFormats, MAX_TIMELAPSE_BETWEEN_MUSICS };
