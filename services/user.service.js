const userModel = require('../models/user.model')

class UserService {

    // register a user model
    async createUser(user) {
        return await userModel.create(user)
    }

    // Edit a user
    async update(id, userData) {
        return await bookModel.findByAndUpdate(id, userData, {
            new: true
        })
    }

    // Delete a user
    async delete(id){
        return await userModel.findByAndDelete(id)
    }

    // // Find a user by their username
    // async findOne(username){
    //     return await userModel.findOne({username})
    // } 

    // find a user by their id
    async findbyID(filter){
        return await userModel.findOne(filter)
    } 

    // Get all users 
    async getAll(filter) {
        return await userModel.find(filter)
    }
}

module.exports = new UserService()