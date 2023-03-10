const joi = require('joi')

const UserSchema = joi.object()
    .keys({
        username: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
        phone: joi.string()
    });

module.exports = UserSchema
