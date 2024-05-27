const Router = require('express')
const {responseTimeMiddleware} = require('../metrics/metrics.js')

const router = new Router()
const userController = require('../controller/user.controller.js')

router.post('/user', responseTimeMiddleware ,userController.createUser)
router.get('/users', responseTimeMiddleware,userController.getUsers)
router.get('/user/:id', responseTimeMiddleware ,userController.getUser)
router.put('/user', responseTimeMiddleware, userController.updateUser)
router.delete('/user/:id', responseTimeMiddleware, userController.deleteUser)

module.exports = router