import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Set default log level
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    // Log to console in development mode
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),

    // Optionally log to a file (useful for production)
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
