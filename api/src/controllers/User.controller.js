
const router=require("express").Router();
const User = require("../models/User.model");


// CREATE User
router.post("/", async(req,res)=>{
    const newUser = new User(req.body);
    console.log(newUser)
    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

// // UPDATE User
router.put("/:id", async(req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
       return res.status(200).json(updatedUser);
    } catch (err) {
       return res.status(500).json(err);
    }
   
});

// DELETE User
router.delete("/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);

       return res.status(200).json("User has been deleted...")
    } catch (error) {
        return res.status(500).json(error)   
    }
});

// GET User by id
router.get("/:id", async(req,res)=>{
    try {
        const user= await User.findById(req.params.id);

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(error)   
    }
});

// GET all User
router.get("/",async(req,res)=>{ 
    try {
        const users = await User.find();
      
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json(error)   
    }
});



module.exports=router;