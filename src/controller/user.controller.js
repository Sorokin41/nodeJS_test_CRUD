const db = require('../db/pool')
const { incrementHttpRequestMethod } = require('../metrics/metrics')

class UserController{

    async createUser(req, res) {
        incrementHttpRequestMethod(req.method, res.statusCode)
        const {name, surname} = req.body
        const newPerson = await db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname])
        res.json(newPerson.rows[0])
    }

    async getUsers(req, res) {
        incrementHttpRequestMethod(req.method, res.statusCode)
        const users = await db.query('SELECT * FROM person')
        res.json(users.rows)
    }

    async getUser(req, res) {
        incrementHttpRequestMethod(req.method, res.statusCode)
        const id = req.params.id
        const user = await db.query('SELECT * FROM person WHERE id = $1', [id])
        logger.info(user.rows[0])
        res.json(user.rows[0])
    }

    async updateUser(req, res) {
        incrementHttpRequestMethod(req.method, res.statusCode)
        const {id, name, surname} = req.params.id
        const newUser = await db.query('UPDATE person SET name = $2, surname = $3 WHERE id = $1', [id, name, surname])
        res.json(newUser.rows[0])
    }

    async deleteUser(req, res) {
        incrementHttpRequestMethod(req.method, res.statusCode)
        const id = req.params.id
        const user = await db.query('DELETE FROM person WHERE id = $1', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()