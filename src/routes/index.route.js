const router = require("express").Router()
const userRouter = require('./user.route')
const postRouter = require('./post.route')
const commentRouter = require('./comment.route')
const testmiddleware = require('../middlewares/test.middleware')
const { fetchAllPosts } = require("../controllers/post.controller")
const { fetchAllComments } = require("../controllers/comment.controller")


router.get('/users/:@username/posts/', testmiddleware, fetchAllPosts)
router.get('/users/:@username/posts/:id/comments/', testmiddleware, fetchAllComments)
router.get('/docs', (req, res) => res.redirect('https://documenter.getpostman.com/view/19026826/2s93JtRPcU'))

router.use('/users', testmiddleware, userRouter)
router.use('/users/:id/posts', testmiddleware, postRouter)
router.use('/users/:id/posts/:id/comments', testmiddleware, commentRouter)


module.exports = router;