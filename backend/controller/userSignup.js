const userModel = require("../models/userModels")

const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const{name,email,password}=req.body
        
        const user=await userModel.findOne({email})

        console.log("user",user)

        if (user){
            throw new Error("User already exists")
        }

        // if(!name){
        //     throw new Error("Please provide name")
        // }

        // if(!email){
        //     throw new Error("Please provide email")
        // }

        // if(!password){
        //     throw new Error("Please provide password")
        // }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something went wrong")
        }

        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }


        const userData=new userModel(payload)
        const saveUser=await userData.save()

        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User Created Successfully"
        })

    }catch(err){
        res.json({
            message: err.message ,
            error:true,
            success:false,
        })
    }
}


module.exports=userSignUpController