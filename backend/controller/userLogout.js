async function userLogout(req,res){
    try{
        res.clearCookie("token")


        res.json({
            message: "Logged out Successfully",
            error:false,
            success:true,
            data:[]
        })




    }catch(err){
        res.json({
            message: err.message ,
            error:true,
            success:false,
        })
    }
}

module.exports=userLogout