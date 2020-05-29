import express, { Router } from 'express';
import socketio from 'socket.io';
import http from 'http';

import { apiRouter } from './api-router';
import { pagesRouter } from './pages-router';
import { staticsRouter } from './statics-router';
import { MongoDBErrorRouter } from './mongo-error-router';

import { getManifest } from './manifest-manager';

import * as config from './config';

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

export { apiRouter, pagesRouter, staticsRouter, MongoDBErrorRouter, getManifest, config, app, server, io };
