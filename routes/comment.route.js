const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const CommentSchema = require("../schemas/Comment.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { 
    createComment,
    updateComment,
    deleteComment,
    getOneComment,
    fetchAll,
    deletedComments } = require('../controllers/comment.controller')

// routers for post
router.get('/del/', isAuth, isAdmin, deletedComments)
router.get('/:id', getOneComment)
router.get('/', fetchAll)
router.post('/', validate(CommentSchema), isAuth, createComment)
router.patch('/:id', validate(CommentSchema), isAuth, updateComment)
router.patch('/del/:id', isAuth, deleteComment)


module.exports = router