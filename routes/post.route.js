const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const PostSchema = require("../schemas/post.schema")
const { isAuth } = require("../middlewares/auth.middleware")

const { 
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    fetchAll } = require('../controllers/post.controller')

// routers for post
router.post('/', validate(PostSchema), isAuth, createPost)
router.patch('/:id', validate(PostSchema), isAuth, updatePost)
router.patch('/softdel/:id', isAuth, deletePost)
router.get('/:id', getOnePost)
router.get('/', fetchAll)

module.exports = router