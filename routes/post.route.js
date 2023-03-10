const router = require('express').Router()

const { 
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    fetchAll } = require('../controllers/post.controller')

// routers for post
router.post('/', createPost)
router.patch('/:id', updatePost)
router.patch('/softdel/:id', deletePost)
router.get('/:id', getOnePost)
router.get('/', fetchAll)

module.exports = router