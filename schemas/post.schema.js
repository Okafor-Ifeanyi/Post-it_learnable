const joi = require('joi')

const PostSchema = joi.object()
    .keys({
        post: joi.string().required().max(280),
        ownerID: joi.string().required().length(24)
    });

module.exports = PostSchema