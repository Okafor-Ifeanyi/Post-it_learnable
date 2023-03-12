const router = require("express").Router()
const userRouter = require('./user.route')
const postRouter = require('./post.route')
const commentRouter = require('./comment.route')
const testmiddleware = require('../middlewares/test.middleware')
const { fetchAllPosts } = require("../controllers/post.controller")
const { fetchAllComments } = require("../controllers/comment.controller")


router.get('/user/:@username/post/', testmiddleware, fetchAllPosts)
router.get('/user/:@username/post/:id/comment/', testmiddleware, fetchAllComments)

router.use('/user', testmiddleware, userRouter)
router.use('/user/:id/post', testmiddleware, postRouter)
router.use('/user/:id/post/:id/comment', testmiddleware, commentRouter)



module.exports = router;