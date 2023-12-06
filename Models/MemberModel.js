import mongoose, { Schema } from "mongoose";

const member= new Schema({
    email:String,
    password:String,
    Dob:Date
})
export default (mongoose.model("Member",member))