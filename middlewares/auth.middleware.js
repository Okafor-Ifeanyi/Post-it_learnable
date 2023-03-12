const { verifyToken } = require('../utils/jwt.util')

const isAuth = (req, res, next) => {
    let token = req.params.token;
    
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

module.exports = { isAuth }