import mongoose from 'mongoose';
import { CustomError } from '../../shared/RoutesResponses';

const opts = {
  errorEventName: 'Server error',
      logDirectory: process.env.LOG_FOLDER ? process.env.LOG_FOLDER : null,
      fileNamePattern:'louki.log',
};

const logger = require('simple-node-logger').createRollingFileLogger( opts );

export const logError = (error: mongoose.Error | CustomError): void => {
  logger.error(`${error.name} : ${error.message}`);
};

export default logger;