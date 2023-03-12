const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const { PostSchema, UpdatePostSchema } = require("../schemas/post.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { 
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    fetchAll,
    deletedPosts } = require('../controllers/post.controller')

// routers for post
router.get('/del/', isAuth, isAdmin, deletedPosts)
router.get('/:id', getOnePost)
router.get('/', fetchAll)
router.post('/', validate(PostSchema), isAuth, createPost)
router.patch('/del/:id', isAuth, deletePost)
router.patch('/:id', validate(UpdatePostSchema), isAuth, updatePost)


module.exports = router