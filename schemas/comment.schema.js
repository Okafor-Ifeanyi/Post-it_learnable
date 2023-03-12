const joi = require('joi')

const CommentSchema = joi.object()
    .keys({
        comment: joi.string().required().max(280),
    });

module.exports = CommentSchema