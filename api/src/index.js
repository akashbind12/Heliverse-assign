
const express=require("express")
const cors=require("cors")
const app=express()

require('dotenv').config()
app.use(express.json())

const UserController=require("./controllers/User.controller")

app.use(cors());


app.use("/", UserController)

const connect=require("./configs/db")

const port=process.env.PORT || 5000
app.listen(port,async()=>{
    try {
        await connect();
        console.log(`Listening on port ${port}`)
    } catch (error) {
        console.log({"error":error.message})
    }
});