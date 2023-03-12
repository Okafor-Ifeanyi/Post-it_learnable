const { verifyToken, decodeToken } = require('../utils/jwt.util')
const UserService = require('../services/user.service')

const isAuth = (req, res, next) => {
    let token = req.params.token;
    console.log(token)

    if( !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(403).json({message: 'Invalid token, Unauthorized user'})
    }

    token = req.headers.authorization.split(' ')[1]

    const { decode, expired } = verifyToken(token);

    if (expired) {
        return res.status(403).json({message: 'Expired token, Unauthorized user'})
    }
    req.user = { _id: decode?._id }
    next();
};


async function isAdmin(req, res, next) {
    let token = req.params.token;
    
    token = req.headers.authorization.split(' ')[1]
    // console.log(token)
    const userID = decodeToken(token);
    console.log(userID);

    try{
        const user = await UserService.findbyID({ _id: userID })
        // console.log(user);
        if (user.isAdmin == true){
            next()
        } else {
            return res.status(403).json({message: 'Not Admin, Unauthorized user'})
        }
    } catch (err) {
        return res.status(403).json({message: err.message})
    }

    // if ( req.user?.isAdmin ){ 
    //     next 
    // } else{ 
    //     return res.status(403).json({message: 'Not Admin, Unauthorized user'}) 
    // }
}

const getCurrentUser = (req, res, next) => {
    let token = req.params.token;

    try{
        token = req.headers.authorization.split(' ')[1]
        
        const userID = decodeToken(token);

        return(userID)
    } catch (err) {
        return res.status(403).json({message: err.message})
    }
}

module.exports = { isAuth, isAdmin, getCurrentUser }