const express = require('express')
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const pinoHttp = require('pino-http');
require('dotenv').config()

const userRouter = require('./src/routes/user.routes')
const { metricsMiddleware } = require('./src/metrics/metrics')

const logDirectory = path.join(__dirname, 'logs')

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Настройка потока записи логов в файл
const logStream = fs.createWriteStream(path.join(logDirectory, 'app.log'), { flags: 'a' });

// Настройка Pino для записи логов в файл
const logger = pino(pino.destination(logStream));

const app = express()
app.use(express.json())
app.use('/', userRouter)

const child = logger.child({ a: 'property' })

// Настройка Pino для логирования HTTP запросов
app.use(pinoHttp({ logger }));

app.use((req, res, next) => {
    next()
  })

app.get('/metrics', metricsMiddleware);

app.listen(process.env.PORT, () => {
  child.info('qq')
  console.log(`Server was started on port ${process.env.PORT}`)
})