import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    useName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

})