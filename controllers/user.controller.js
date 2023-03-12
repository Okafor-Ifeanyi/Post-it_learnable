const service = require('../services/user.service');
const { generateToken } = require("../utils/jwt.util")

class UserController {

    // login a user
    async login(req, res, next) {
        const {email, password} = req.body;
        // console.log(email, password);

        try {
            const user = await service.findbyID({ email : email });
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email',
                })
            }
            
            const result = await user.matchPassword(password)

            if(!result){
                return res.status(401).json({
                    success: false,
                    message: 'Invalid Password',
                })
            }
            const token = generateToken({ _id: user._id })

            res.json({ token: token, "token Type": "Bearer", "user_id": user._id  })
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            })
        }
    }

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
                _id: updateData.id
            })
            console.log(available)
            if (available){
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

    // Delete a single user - Soft delete
    async deleteUser(req, res) {
        const userID = req.params.id
        post
        const category = await service.findbyID({ _id: userID, deleted: false });
        if (!category || category.deleted == true) {
            res.status(404).json({
                success: false,
                message: 'User does not exist'
            })
        } else { 
            try {
            await service.update(userID, { deleted: true }); // <= change delete status to 'true'
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'});
          } catch (error) {
            res.status(500).json(error)
          }
        }
    }

    // Fetch a single user by username
    async getUserbyUsername(req, res){
        const info = req.body

        // Check if the book to delete is the database
        const existingUser = await service.findbyID({
            username: info.username
        })

        if (!existingUser) return res.status(403).json({
            success: false,
            message: 'User does not not exist'
        })

        return res.status(201).json({
            success: true,
            message: 'User Fetched successfully',
            data: existingUser
        })
    }

    // Fetch a single user by ID
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