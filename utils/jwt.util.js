const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {
          expired: false,
          decoded,
        };
      } catch (e) { 
        return {
          expired: e.message === 'jwt expired',
          decoded: null,
        };
      }
}

module.exports = { generateToken, verifyToken }