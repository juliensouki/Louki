const opts = {
  errorEventName: 'Server error',
      logDirectory: process.env.LOG_FOLDER ? process.env.LOG_FOLDER : null,
      fileNamePattern:'louki.log',
};

const logger = require('simple-node-logger').createRollingFileLogger( opts );

export default logger;