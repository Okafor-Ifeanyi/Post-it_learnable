const joi = require('joi')

// Joi Validation schema used to verify req data
const PostSchema = joi.object()
    .keys({
        post: joi.string().required().max(280)
    });

module.exports = PostSchema