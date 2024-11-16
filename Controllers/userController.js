import User from "../Models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


const addUser = async (req,res)=>{

  try {
    
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
    if (err) {
      console.error('Error occurred while hashing:', err);
      res.status(500).json({error:'Internal Server error'})
    }
  
      var userItem = {
        name : req.body.name,
        email: req.body.email,
        username : req.body.username,
        password : hash,
        createdAt:new Date()
      }
      var user = new User(userItem)
      await user.save()
      res.status(201).json(user)
});
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
      
  }

  const login = async (req,res)=>{
    try {
      const {email,password} = req.body
      const user = await User.findOne({email:email})
      if(!user){
        return res.status(500).json({message:"User not found"})
      }
      const isValid = await bcrypt.compare(password,user.password)
      console.log(isValid)
      if(!isValid){
        return res.status(500).json({message:"Invalid credentials"})
      }
      let payload={user:email,pwd:password};
      const secret_key = process.env.JWT_SECRET_KEY

      let token = jwt.sign(payload,secret_key)

      res.status(200).json({message:"Login successful",token:token})
    } catch (error) {
      console.log(error)
    res.status(500).json({error:'Internal Server error'})
    }
  }
const getUsers = async (req,res)=>{
  try {
    
    const users = await User.find({});
    if(!users){
      res.status(404).json({error:'Users not found'})
    }
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}


const getUserByUserName = async (req,res)=>{
  try {
    
   const user = await User.findOne({ username:req.params.username  }).exec();
    if(!user){
      res.status(404).json({error:'User not found'})
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}


const updateUserbyId = async (req,res)=>{
  try {
    
   const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user){
      res.status(404).json({error:'User not found'})
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}


const deleteUser = async (req,res)=>{
  try {
    
   const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
      res.status(404).json({error:'User not found'})
    }
    res.status(200).json({message:"Successfully deleted"})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
}

  export {login,getUsers,getUserByUserName,addUser,updateUserbyId,deleteUser}