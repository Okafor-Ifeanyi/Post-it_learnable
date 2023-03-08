const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Posts = Schema({
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    createdAt: { timestamp: true },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    }
})