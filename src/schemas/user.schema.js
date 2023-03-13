const joi = require('joi')

// Joi Validation schema used to verify req data
const RegisterSchema = joi.object()
    .keys({
        username: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
        phone: joi.string(),
    });

const LoginSchema = joi.object()
.keys({
    email: joi.string().required().email(),
    password: joi.string().min(6).required()
});

const UpdateSchema = joi.object()
.keys({
    username: joi.string().required(),
    email: joi.string().required().email(),
    phone: joi.string(),
    isAdmin: joi.boolean().required().default(false)
});

module.exports = { RegisterSchema, LoginSchema, UpdateSchema };
