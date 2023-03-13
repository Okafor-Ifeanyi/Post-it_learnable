// const { AnySchema } = require('@hapi/joi');
const UserSchema = require('../schemas/user.schema')
const AnySchema = require('joi')

const validate = (schema) => {
    return async (req, res, next) => {
        const { error } = await schema.validate(req.body, { abortEarly:false, allowUnknown:true });
        const valid = error == null
        if ( valid ) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => {
            return {
                message: i.message,
                path: i.path[0],
            };
            });
  
            res.status(422).json({ error: message })
            // res.status(422).json({ 
            //     success: false,
            //     message: value.error.details[0].message 
            // });
        }
}};
module.exports = validate;
