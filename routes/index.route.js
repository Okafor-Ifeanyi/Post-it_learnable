const router = require("express").Router()
const userRouter = require('./user.route')
const postRouter = require('./post.route')
const testmiddleware = require('../middlewares/test.middleware')

router.use('/user', testmiddleware, userRouter)
router.use('/user/:id/post', testmiddleware, postRouter)


module.exports = router;