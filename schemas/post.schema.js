const joi = require('joi')

const PostSchema = joi.object()
    .keys({
        post: joi.string().required().max(280),
        ownerID: joi.string().required().length(24)
    });

const UpdatePostSchema = joi.object()
    .keys({
        post: joi.string().required().max(280),
    });

module.exports = { PostSchema, UpdatePostSchema };