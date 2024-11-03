const userModel=require("../models/userModels")

async function allUsers(req,res){
    try{
        console.log("userid", req.userId)

        const allUsers = await userModel.find()

        res.json({
            message:"All user",
            data:allUsers,
            success:true,
            error:false
        })
    }catch(err){
        res.status(400).json({
            message:err,
            error:false,
            success:false
        })
    }
}
 
module.exports=allUsers