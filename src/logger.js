const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = createLogger({
  level: process.env.MNIA_LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
