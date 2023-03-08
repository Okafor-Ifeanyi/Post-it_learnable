const router = require("express").Router()
const userRouter = require('./user.route')
const testmiddleware = require('../middlewares/test.middleware')

router.use('/user', testmiddleware, userRouter)

module.exports = router; 