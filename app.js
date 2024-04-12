const express = require('express')
require('dotenv').config()
const pool = require('./src/db/pool')

const app = express()

app.get('/userdata', async (req, res) => {
    try {
        const newUser = await pool.query(
            `SELECT * FROM public.newtable`
        )
        res.json(newUser)
    } catch (err) {
        console.error(err);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server was started on port ${process.env.PORT}`)
})
