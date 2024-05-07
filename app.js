const express = require('express')
require('dotenv').config()
const client = require('prom-client')

const userRouter = require('./src/routes/user.routes')
const { responseTimeMiddleware, metricsMiddleware } = require('./src/metrics/metrics')

const app = express()
app.use(express.json())
app.use('/', userRouter)

app.use((req, res, next) => {
    next()
  })

app.get('/metrics', metricsMiddleware);

app.listen(process.env.PORT, () => console.log(`Server was started on port ${process.env.PORT}`))