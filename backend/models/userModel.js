import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const user_schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
}, {
    timestamps:true
})

user_schema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

user_schema.methods.matchPassword = async function(entered_password){
    return await bcrypt.compare(entered_password, this.password);
} 

const User = mongoose.model("User", user_schema)
export default User;