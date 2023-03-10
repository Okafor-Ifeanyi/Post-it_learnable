const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const UserSchema = require("../schemas/user.schema")

const { createUser,
    updateUser,
    deleteUser,
    getUserbyUsername,
    getOneUser,
    fetchAll
    } = require('../controllers/user.controller')

// routers for user
router.post('/', validate(UserSchema), createUser)
router.patch('/:id', validate, updateUser) 
router.delete('/:id', deleteUser)
router.post('/username', getUserbyUsername) 
router.get('/:id', getOneUser)
router.get('/', fetchAll)

// routers for post
 


// routers for comment


module.exports = router