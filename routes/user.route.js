const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const { RegisterSchema , LoginSchema, UpdateSchema } = require("../schemas/user.schema")
const { isAuth } = require("../middlewares/auth.middleware")

const { login,
    createUser,
    updateUser,
    deleteUser,
    getUserbyUsername,
    getOneUser,
    fetchAll
    } = require('../controllers/user.controller')

// routers for user
router.post('/login/', validate(LoginSchema), login)
router.post('/', validate(RegisterSchema), createUser)
router.patch('/:id', validate(UpdateSchema), isAuth, updateUser) 
router.delete('/:id', isAuth, deleteUser)
router.post('/username', getUserbyUsername) 
router.get('/:id', getOneUser)
router.get('/', fetchAll)


module.exports = router