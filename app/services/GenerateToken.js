const jwt=require("jsonwebtoken")
exports.generateToeken = (userId,userrole,res)=>{
    const token= jwt.sign({
        userId,
        userrole
    },
    process.env.JWT_SECRET,
    {expiresIn:"15d"})

    res.cookie("jwt-token",token,{
        maxAge:15*24*60*60*1000, 
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })
    return token;
}