const User = require('../Models/usermodel')
const bcrypt = require("bcryptjs");
const genreratetoken = require('../utility/genreratetoken')
exports.signup =  async(req, res) => {
    try{
        const {fullname , username, password, confirmPassword,gender} =req.body;
        if(password !== confirmPassword ){
            return res.status(400).json({
                sucess:false,
                message:"passward doest not match "
            })
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({
                sucess:false,
                message:"username already exists "
            })
        }
        //  hashnpasswaord 
        const salt = await bcrypt.genSalt(10);
        const hashpassword  = await bcrypt.hash(password,salt);  

        //  we will hash passward here 

        //  profile pics 
        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofiepic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        const newUser =  new User({
            fullname, 
            username,
            password:hashpassword,
            gender,
            profilepic:gender === "male" ? boyprofilepic : girlprofiepic

        })
     if(newUser){
        //  jwt tokens 
        genreratetoken(newUser._id ,res)
      


        await newUser.save();
        res.status(201).json({ 
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic

             
        })
     }
     else{
        res.status(401).json({
            sucess:false,
            message:"invalid user data "

        })
     }

    }
    catch(error){
        return res.status(401).json({
            message:error.message
            
        })

    }
}

exports.login =  async(req, res) => {
     try{
        const {username,password} = req.body;
         const ExistingUser = await User.findOne({username});
         const ispassword = await bcrypt.compare(password,ExistingUser?.password||"");
         if(!ExistingUser || !ispassword){
            return res.status(400).json({
                error: "Invalid username or password" });
         }
         genreratetoken(ExistingUser._id,res);

          res.status(200).json({  
            _id:ExistingUser._id,
            fullname:ExistingUser.fullname,
            username:ExistingUser.username,
            profilepic:ExistingUser.profilepic

         })

     } 
     catch(error){
        return res.status(401).json({
         sucess:false,
         message:error.message,
         })

        

     }
}

exports.logout =  async(req, res) => {
  try{
    res.cookie("jwt","",{maxAge: 0});
    res.status(200).json(
        { message: "Logged out successfully" }
    
    );

  }
  catch(error){
    console.log("Error in logout controller", error.message);
    res.status(401).json(
        { error: "Internal Server Error" }
    
    )

 
  }

    // console.log("login");
}
