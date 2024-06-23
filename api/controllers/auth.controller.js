import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const {username,email,password } = req.body;

  try{
  const hashedPassword = await bcrypt.hash(password,10)

  //creating user and saving it in mongodb
  const newUser = await prisma.user.create({
    data:{
      username,
      email,
      password:hashedPassword
    }
  })

  console.log(newUser)

  res.status(201).json({message:"User Created"})
}catch(err){
  console.log(err)
  res.status(500).json({message:"Error Creating User"})
}
};

export const login = async (req, res) => {
  try{
const {username,password} = req.body;
// check if user exists
const user = await prisma.user.findUnique({
  where:{username}
})
 if(!user) return res.status(401).json({message:"Invalid Credentials!"})

//check the password is correct

const isPasswordVaild =  await bcrypt.compare(password,user.password)

if(!isPasswordVaild) return res.status(401).json({message:"Invalid Credentals!"})

//generate cookie token and send to the user

// res.setHeader("set-Cookie","test="+"myValue").json("success")


const age = 1000*60*60*24*7

const token = jwt.sign({
  id:user.id
},process.env.JWT_SECRET_KEY,{expiresIn:age})

res.cookie("token",token,{
  httpOnly:true,
  // secure:true,
  maxAge:age,
}).status(200).json({message:"Login Successful"})
  }catch(err){
    console.log(err);
    res.status(500).json({message:"failed to login!"})
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message:"Logout Successful"})
};