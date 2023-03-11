const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const { RegisterSchema , LoginSchema, UpdateSchema } = require("../schemas/user.schema")

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
router.patch('/:id', validate(UpdateSchema), updateUser) 
router.delete('/:id', deleteUser)
router.post('/username', getUserbyUsername) 
router.get('/:id', getOneUser)
router.get('/', fetchAll)

// routers for post
 


// routers for comment


module.exports = router