
const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    PhoneNumber:{ type: String , required: true },
    Address: { type: String, required: true },
    Company: { type: String, required: true },
    Designation:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false
})

module.exports=mongoose.model("Users",UserSchema)
