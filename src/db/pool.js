const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'localhost',
    port: 6432,
    database: process.env.POSTGRES_DB
});

pool.query(`
    create TABLE IF NOT EXISTS person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255));
`).then(() => {
    console.log('Table is successfully created or already exists');
    pool.end()
})

module.exports = pool;