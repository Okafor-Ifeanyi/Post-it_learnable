const router = require('express').Router()

const { createUser,
    updateUser,
    deleteUser,
    getUserbyUsername,
    getOneUser,
    fetchAll
    } = require('../controllers/user.controller')

// routers for user
router.post('/', createUser)
router.patch('/:id', updateUser) 
router.delete('/:id', deleteUser)
router.post('/username', getUserbyUsername) 
router.get('/:id', getOneUser)
router.get('/', fetchAll)

// routers for post
 


// routers for comment


module.exports = router