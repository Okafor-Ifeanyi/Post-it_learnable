const router = require("express").Router()
const userRouter = require('./user.route')
const postRouter = require('./post.route')
const commentRouter = require('./comment.route')
const testmiddleware = require('../middlewares/test.middleware')

router.use('/user', testmiddleware, userRouter)
router.use('/user/:id/post', testmiddleware, postRouter)
router.use('/user/:id/post/:id/comment', testmiddleware, commentRouter)


module.exports = router;