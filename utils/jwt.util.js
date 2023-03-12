const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
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

const decodeToken = (token) => {
  const id = jwt_decode(token)._id
  return id
}

// id = decodeToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBjNzRmZTI2YTAyZjI1OGE0ZWM5ODkiLCJpYXQiOjE2Nzg1NTQyOTN9.Cb6FIFhe3AQ6wCyg1iQFbURTQKf8twmBsofKkONK4hI")
// console.log(id)
module.exports = { generateToken, verifyToken, decodeToken }