const express = require('express')
require('dotenv').config()
const userRouter = require('./src/routes/user.routes')

const app = express()

app.use('/', userRouter)

app.listen(process.env.PORT, () => console.log(`Server was started on port ${process.env.PORT}`))