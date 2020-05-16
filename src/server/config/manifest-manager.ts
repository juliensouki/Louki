import fs from 'fs';
import path from 'path';
import { IS_DEV, WEBPACK_PORT } from './config';

function getManifestFromWebpack(): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = require('request');
    request.get(`http://localhost:${WEBPACK_PORT}/statics/manifest.json`, {}, (err, data) =>
      err ? reject(err) : resolve(data.body),
    );
  });
}

export async function getManifest() {
  let manifestStr: string;
  if (IS_DEV) {
    manifestStr = await getManifestFromWebpack();
  } else {
    manifestStr = fs.readFileSync(path.join(process.cwd(), 'dist', 'statics', 'manifest.json'), 'utf-8').toString();
  }
  const manifest = JSON.parse(manifestStr);
  return manifest;
}
