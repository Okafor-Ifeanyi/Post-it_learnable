const router = require("express").Router()
const userRouter = require('./everySingle.route')
const postRouter = require('./post.route')
const testmiddleware = require('../middlewares/test.middleware')

router.use('/user', testmiddleware, userRouter)
router.use('/post', postRouter)

module.exports = router; 