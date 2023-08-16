const { createLogger, format, transports } = require('winston')

const env = process.env.server || 'development'

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.simple(),
    format.colorize(),
    format.timestamp({ format: "YYYY/MM/DD HH:mm:ss:ms" }),
    format.printf((info) => `${info.message}`)
  ),
  transports: [
    new transports.Console()
  ],
});

module.exports.logger = logger;
