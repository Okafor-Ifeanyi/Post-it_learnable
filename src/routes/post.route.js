const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const PostSchema = require("../schemas/post.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { 
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    fetchAllPosts,
    deletedPosts } = require('../controllers/post.controller')

// routers for post
router.get('/del/', isAuth, isAdmin, deletedPosts)
router.get('/:id', getOnePost)
router.get('/', fetchAllPosts)
router.post('/', validate(PostSchema), isAuth, createPost)
router.patch('/del/:id', isAuth, deletePost)
router.patch('/:id', validate(PostSchema), isAuth, updatePost)


module.exports = router