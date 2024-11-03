const userModel = require("../models/userModels")


async function userDetailsController(req,res){
    try{
        console.log("user id",req.userId)
        const user= await userModel.findById(req.userId)

        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details"
        })

        console.log("user",user)

    }catch(err){
        res.status(400).json({
            message:err,
            error:false,
            success:false
        })
    }
}

module.exports=userDetailsController