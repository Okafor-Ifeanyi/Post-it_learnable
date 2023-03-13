const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const CommentSchema = require("../schemas/comment.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { 
    createComment,
    updateComment,
    deleteComment,
    getOneComment,
    fetchAllComments,
    deletedComments } = require('../controllers/comment.controller')

// routers for post
router.get('/del/', isAuth, isAdmin, deletedComments)
router.get('/:id', getOneComment)
router.get('/', fetchAllComments)
router.post('/', validate(CommentSchema), isAuth, createComment)
router.patch('/:id', validate(CommentSchema), isAuth, updateComment)
router.patch('/del/:id', isAuth, deleteComment)


module.exports = router