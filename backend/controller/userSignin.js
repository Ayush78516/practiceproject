const bcrypt=require("bcryptjs")
const userModel = require("../models/userModels")
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try{
        const{email,password}=req.body
        if(!email){
            throw new Error("Please provide email")
        }

        if(!password){
            throw new Error("Please provide password")
        }
        
        const user=await userModel.findOne({email})

        if (!user){
            throw new Error("User not found")
        }
    
        
        const checkPassword=await bcrypt.compare(password,user.password)
    
        console.log("checkPassword",checkPassword)
    
        if(checkPassword){
            const tokenData={
                _id:user._id,
                email:user.email,
            }

            // Create a JSON Web Token (JWT) using the tokenData.
            const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *24});


            const tokenOption={
                httpOnly:true,
                secure:true
            }

            res.cookie("token",token,tokenOption).json({
                message:"Login Successfully",
                data:token,
                success:true,
                error:false
            })
        }else{
            throw new Error("Please check password")
        }
    
    
    
    
    }catch(err){
        res.json({
            message: err.message ,
            error:true,
            success:false,
        })
    }
}
module.exports=userSignInController