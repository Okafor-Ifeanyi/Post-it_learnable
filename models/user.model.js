const mongoose = require('mongoose');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validator: [isEmail, ""]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true
    }, 
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
    // createdAt: {timestamp: true}
},  { timestamps: true });

// 
User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserModel = mongoose.model("User", User)
module.exports = UserModel
