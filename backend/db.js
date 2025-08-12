const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    email: {type: String, unique:true},
    password:String,
    name:String
})

const Notes=new Schema({
    description:String,
    userId:ObjectId
})

const UserModel=mongoose.model('users',User);
const NotesModel=mongoose.model('notes',Notes);

module.exports={UserModel,NotesModel}; 