const mongoose = require('mongoose');
const localStrategy = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    admin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

userSchema.plugin(localStrategy)

const User = new mongoose.model('user', userSchema);

module.exports = User