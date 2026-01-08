//model/user.js

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        select:false //do not return password field in queries
    },
    isPro:{
        type:Boolean,
        default:""
    },
    avatar:{
        type:String,
        default:""
    },
},
 {timestamps:true}
);

//password hashing middleware
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); //next() mean to proceed to the next middleware or save operation
});

//method to compare password

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);