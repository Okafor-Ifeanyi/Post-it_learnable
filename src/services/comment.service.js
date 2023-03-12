const commentModel = require('../models/comment.model')

class commentService {
    // create a new comment
    async createcomment(comment) {
        return await commentModel.create(comment)
    }

    // Edit aa comment
    async update(id, userData) {
        return await commentModel.findByIdAndUpdate(id, userData), {
            new: true
        }
    }
    
    // find a comments by their id
    async findbyID(filter){
        return await commentModel.findOne(filter)
    }

    // Get all comments
    async getAll(filter) {
        return await commentModel.find(filter)
    }

    // Get all comments by a user
    async getAllByUser(user, filter) {
        return await commentModel.find(filter, user)
    }
}

module.exports = new commentService()