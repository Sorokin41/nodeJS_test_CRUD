const Pool = require('pg').Pool

const pool = new Pool({
    user: 'user',
    password: 'password',
    host: 'chatops-db',
    port: 5432,
    database: 'debug'
});

module.exports = pool;