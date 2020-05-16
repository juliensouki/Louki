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

export { IS_DEV, VERSION, SERVER_PORT, WEBPACK_PORT };
