const express = require('express')
require('dotenv').config()
const winston = require('winston');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
    new winston.transports.Console()
  ]
});

logger.log('info', 'Пример логирования в файл');

const userRouter = require('./src/routes/user.routes')
const { metricsMiddleware } = require('./src/metrics/metrics')

const app = express()
app.use(express.json())
app.use('/', userRouter)


app.use((req, res, next) => {
    next()
  })

app.get('/metrics', metricsMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server was started on port ${process.env.PORT}`)
})