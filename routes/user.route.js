const router = require('express').Router()
const validate = require('../middlewares/validate.middleware')
const { RegisterSchema , LoginSchema, UpdateSchema } = require("../schemas/user.schema")
const { isAuth, isAdmin } = require("../middlewares/auth.middleware")

const { login,
    createUser,
    updateUser,
    deleteUser,
    getUserbyUsername,
    getOneUser,
    fetchAll,
    deleted } = require('../controllers/user.controller')

// routers for user
router.get('/deleted', isAuth, isAdmin, deleted);
router.get('/@:username', getUserbyUsername);
router.get('/:id', getOneUser);
router.get('/', fetchAll);
router.post('/', validate(RegisterSchema), createUser);
router.post('/login/', validate(LoginSchema), login);
router.patch('/:id', validate(UpdateSchema), isAuth, updateUser);
router.patch('/del/:id', isAuth, deleteUser);


module.exports = router 