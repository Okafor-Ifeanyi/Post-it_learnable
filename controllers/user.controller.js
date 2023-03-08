const service = require('../services/user.service');

class UserController {

    // create a user
    async createUser(req, res){
        const info = req.body;
        console.log(info)

        // Check if password is too short
        const pwd = info.password.length

        if( pwd < 6)res.status(403).json({
            success: false,
            message: 'Minimum password length is 6 characters'
        })

        // check if user exists already
        const existingusername = await service.findbyID({
            email: info.email
        })
        const existingemail = await service.findbyID({
            username: info.username
        })
        console.log(existingusername, existingemail)
        console.log("Here")
        

        if(existingusername || existingemail)res.status(403).json({
            success: false,
            message: 'User already exists'
        })

        const newUser = await service.createUser(info)

        res.status(200).json({
            success: true,
            message: 'User created',
            data: newUser
        })
    }

    // Update a user 
    async updateUser(req, res){
        const infoID = req.params.id
        const updateData = req.body
        
         // check if use does not exist
         const existingUser = await service.findbyID({
            _id: infoID
        })
        
        if(!existingUser)res.status(403).json({
             success: false,
             message: 'User does not exists'
         })
         
        // Since the username is a unique key, we have to make it consistent 
        if (existingUser) {
            const available = await service.findbyID({
                _id: updateData.id.toLowercase()
            })

            if (available._id.toString() == existingUser._id.toString()){
                res.status(403).json({
                    success: false,
                    message: 'User with update name already exists'
                })
            }
        }

        const updatedData = await service.update(infoID, updateData)

        res.status(200).json({
            success: true,
            message: 'Body updated successfully',
            data: updatedData
        })
    }

    // Delete a single user 
    async deleteUser(req, res) {
        const userID = req.params.id

        // Check if the book to delete is the database
        const existingUser = await service.findbyID({
            _id: userID
        })
 
        if (!existingUser) res.status(403).json({
            success: false,
            message: 'Book to edit does not exist'
        })

        const deleteBook = await service.delete(bookID)

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deleteBook
        })
    }

    // Fetch a single user by username
    async getUserbyUsername(req, res){
        const info = req.body

        // Check if the book to delete is the database
        const existingBook = await service.findbyID({
            username: info.username
        })
        console.log(existingBook)

        if (!existingBook) res.status(403).json({
            success: false,
            message: 'User does not not exist'
        })

        res.status(201).json({
            success: true,
            message: 'Book Fetched successfully',
            data: existingBook
        })
    }

    // Fetch a single user by username
    async getOneUser(req, res){
        const infoID = req.params.id

        // Check if the book to delete is the database
        const existingBook = await service.findbyID({
            _id: infoID
        })

        if (!existingBook) res.status(403).json({
            success: false,
            message: 'User does not not exist'
        })

        res.status(201).json({
            success: true,
            message: 'User Fetched successfully',
            data: existingBook
        })
    }

    // Fetch all users in the db
    async fetchAll(req, res){
        const existingUser = await service.getAll({})

        res.status(200).json({
            success: true,
            message: 'user fetched successfully',
            data: existingUser
        })
    }
}   

module.exports = new UserController()