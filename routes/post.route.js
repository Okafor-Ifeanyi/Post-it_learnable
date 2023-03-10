const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const PostSchema = require("../schemas/post.schema")

const { 
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    fetchAll } = require('../controllers/post.controller')

// routers for post
router.post('/', validate(PostSchema), createPost)
router.patch('/:id', validate(PostSchema), updatePost)
router.patch('/softdel/:id', deletePost)
router.get('/:id', getOnePost)
router.get('/', fetchAll)

module.exports = router