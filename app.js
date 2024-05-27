const express = require('express')
require('dotenv').config()

const logger = require('./src/logger/logger')


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
  logger.info(` pid: ${process.pid}, timestamp: ${new Date().getTime()} message: Server was started on port ${process.env.PORT} `)
})
