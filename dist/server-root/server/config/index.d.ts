/// <reference types="node" />
import http from 'http';
import { apiRouter } from './api-router';
import { pagesRouter } from './pages-router';
import { staticsRouter } from './statics-router';
import { MongoDBErrorRouter } from './mongo-error-router';
import { getManifest } from './manifest-manager';
import * as config from './config';
declare const app: import("express-serve-static-core").Express;
declare const server: http.Server;
declare const io: any;
export { apiRouter, pagesRouter, staticsRouter, MongoDBErrorRouter, getManifest, config, app, server, io };
