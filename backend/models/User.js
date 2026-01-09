//model/user.js

import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false //do not return password field in queries
    },
    isPro: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
);

// Create model
const User = mongoose.model("User", userSchema);

// Export model
export default User;