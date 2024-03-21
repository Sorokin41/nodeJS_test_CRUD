const express = require('express')
require('dotenv').config()
const client = require('./src/db/client')

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server was started on port ${process.env.PORT}`)

    client.connect()

    const result = client.query('SELECT NOW()')
    console.log(result)
    client.end()
})
