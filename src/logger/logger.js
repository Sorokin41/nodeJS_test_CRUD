const winston = require('winston');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './logs/app/app.log' }),
    new winston.transports.Console()
  ]
});

module.exports = logger