const joi = require('joi')

// Joi Validation schema used to verify req data
const CommentSchema = joi.object()
    .keys({
        comment: joi.string().required().max(280),
        postID: joi.string().required().length(24)

    });

module.exports = CommentSchema