const PostService = require('../services/post.service')
const commentService = require('../services/comment.service')
// const { isAdmin } = require("../middlewares/auth.middleware")
const { decodeToken } = require("../utils/jwt.util")


class commentController {
    
    // create a comment
    async createComment(req, res){
        const info = req.body;
        let token = req.params.token;

        // const token = req.params.token
        

        try{
            // Verify post
            const post = await PostService.findbyID({ _id: info.postID, deleted: false });
            
            if (!post){
                throw { status: 404, message: 'Post not found' };
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)

            const ownerID = currentUser_id;
            
            const newcomment = await commentService.createcomment({...info, ownerID})
            // const newcomment = await commentService.createcomment(info)
            // Success Alert
            return res.status(200).json({ success: true, message: 'Comment created', data: newcomment })
        } catch (error) {
            return res.status(403).json({ success: false, message: error })           
        }
        
    }

    // Update a user
    async updateComment(req, res){ 
        const infoID = req.params.id
        const updateData = req.body
        let token = req.params.token;

        try{
            // Verify comment
            const comment = await commentService.findbyID({ _id: infoID, deleted: false })

            if(!comment) {
                throw { status: false, message: 'Comment not found' };
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == comment.ownerID) {
                const updatedData = await commentService.update(infoID, updateData) //  Updates comment
                return res.status(200).json({ 
                    success: true, 
                    message: 'Body updated successfully', 
                    data: updatedData })
            } else {
                    res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } catch (error) {
            return res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Delete a single comment
    async deleteComment(req, res) {
        const commentID = req.params.id
        let token = req.params.token;
        
        try{
            // Check if the comment is the database except deleted
            const category = await commentService.findbyID({ _id: commentID, deleted: false });

            if (!category || category.deleted == true) {
                throw { success: false, message: 'comment does not exist'}
            }
            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == category.ownerID ) { 
                await commentService.update(commentID, { deleted: true }); // <= change delete status to 'true'
                res.status(200).json({ 
                    success: true, 
                    message: 'Post deleted successfully'});
            } else {
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }


    // Fetch a single comment by ID
    async getOneComment(req, res){
        const infoID = req.params.id
        
        // Check if the comment is the database except deleted
        try{
            const existingcomment = await commentService.findbyID({
                _id: infoID, deleted: false
            })

            if (!existingcomment) {
                throw { success: false, message: 'comment does not not exist'}

            } else {
                res.status(201).json({ success: true, message: 'comment Fetched successfully', data: existingcomment })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all comments in the db
    async fetchAllComments(req, res){
        // Check if the comment is the database except deleted
        try{
            const existingcomment = await commentService.getAll({deleted: false})

            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingcomment }) 
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all deleted comments in the db
    async deletedComments(req, res){
        // Check if the comment is the database except deleted
        try{
            const existingcomment = await commentService.getAll({deleted: true})

            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingcomment })
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
       
    }
}

module.exports = new commentController()