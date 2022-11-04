
const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    age:{ type: String , required: true },
    Gender: { type: String, required: true },
    Qualification: { type: String, required: true },
    Occupation:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false
})

module.exports=mongoose.model("user",UserSchema)
