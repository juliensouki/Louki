import mongoose from 'mongoose';
import fs from 'fs';
import { CustomError } from '../../shared/RoutesResponses';
import simpleNodeLogger from 'simple-node-logger';

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

const doesFileExist: boolean = process.env.LOG_FILE ? fs.existsSync(process.env.LOG_FOLDER) : false;

const logger =
  process.env.LOG_FOLDER && doesFileExist
    ? simpleNodeLogger.createRollingFileLogger(opts)
    : simpleNodeLogger.createSimpleLogger(opts);

export const logError = (error: mongoose.Error | CustomError): void => {
  logger.error(`${error.name} : ${error.message}`);
};

export default logger;
