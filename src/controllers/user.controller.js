const service = require('../services/user.service');
const { generateToken, decodeToken } = require("../utils/jwt.util")
const { isAdmin } = require("../middlewares/auth.middleware")
const generateRandomAvatar = require("../utils/avatar.util")

class UserController {

    // login a user
    async login(req, res, next) {
        const {email, password} = req.body;

        try {
            const user = await service.findbyID({ email : email, deleted: false });
            
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email' })
            }
            
            const result = await user.matchPassword(password)

            if(!result){ 
                return res.status(401).json({ success: false, message: 'Invalid Password'})
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

        try{
            // check if user exists already
            const existingusername = await service.findbyID({ email: info.email, deleted: false })

            const existingemail = await service.findbyID({ username: info.username, deleted: false })

            // Checks if there is an existing username or email in the system
            if( existingusername || existingemail) { 
                return res.status(403).json({ success: false, message: 'User already exists' })
            }

            const { avatarUrl, imageTag } = await generateRandomAvatar(info.email)
            // console.log(avatar, imageTag)
            // creates a new user
            const newUser = await service.createUser({ ...info, avatarUrl, imageTag })

            return res.status(200).json({ success: true, message: 'User created', data: newUser })
        } 
        catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Update a user
    async updateUser(req, res){
        const infoID = req.params.id
        const updateData = req.body
        let token = req.params.token;
        
        try{
            // check if use does not exist
            const existingUser = await service.findbyID({ _id: infoID, deleted: false })
            
            // Check if the user is existing
            if(!existingUser){
                return res.status(403).json({ success: false, message: 'User does not exists' })
            }
           
            // Since the username is a unique key, we have to make it consistent 
            if (existingUser) {
                const available = await service.findbyID({ username: updateData.username, deleted: false })
                
                // throws an error if the username selected is taken
                if (available){ 
                    return res.status(403).json({ success: false, message: 'User with update name already exists'})
                }
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == infoID || isAdmin) {
                const updatedData = await service.update(infoID, updateData)

                res.status(200).json({ success: true, message: 'Body updated successfully', data: updatedData })
            
            } else {
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
            
        } 
        catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
         
    }

    // Delete a single user - Soft delete
    async deleteUser(req, res) {
        const userID = req.params.id
        let token = req.params.token;
        
        try {
            // Check if the user is the database except deleted
            const category = await service.findbyID({ _id: userID, deleted: false });

            if (!category || category.deleted == true) {
                throw { success: false, message: 'User does not exist'}
            } 
            
            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == userID || isAdmin ) {
                await service.update(userID, { deleted: true }); // <= change delete status to 'true'

                return res.status(200).json({ 
                    success: true, 
                    message: 'User deleted successfully'});
            } else {
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } 
        catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch a single user by username
    async getUserbyUsername(req, res){
        const username = req.params.username

        try{
             // Check if the book to delete is the database
            const existingUser = await service.findbyID({
                username: username, deleted: false
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
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }

    // Fetch a single user by ID
    async getOneUser(req, res){
        const infoID = req.params.id

        try{
            // Check if the book to delete is the database
            const existingBook = await service.findbyID({
                _id: infoID, deleted: false
            })
    
            if (!existingBook){
                return res.status(403).json({
                    success: false,
                    message: 'User does not not exist'
                })
            } 
    
            res.status(201).json({
                success: true,
                message: 'User Fetched successfully',
                data: existingBook
            })
        } 
        catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all users in the db
    async fetchAll(req, res){

        try{
            // Find all the users in the system excluding the deleted guys
            const existingUser = await service.getAll({deleted: false})

            res.status(200).json({
                success: true,
                message: 'user fetched successfully',
                data: existingUser
            })
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all deleted users in the db
    async deleted(req, res){
        try{
            const existingUser = await service.getAll({deleted: true})

            res.status(200).json({
                success: true,
                message: 'user fetched successfully',
                data: existingUser
            })
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }
}   

module.exports = new UserController()

try{
            
} catch (error) {
    res.status(403).json({ success: false, message: error })                       
}