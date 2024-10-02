import User from "../models/user/user.model"

 exports.auth =async (req,res,next)=>{
    try {
        const token =req.cookies["jwt-netflix"]
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized -  no token provided"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized - Invalid Token"})
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({success:false,message:"User not found"})
        }
        req.user =user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        return res.status(500).json({success:false,message:"Internal server error"})
        
    }
 }

 exports.IsUser =async(req,res,next)=>{
    if(req.user.userrole=="user"){
        next();
    }
    else{
        return res.status(401).send("unauthorized")
    }
}
exports.IsAdmin =async (req,res,next)=>{
if(req.user.userrole=="admin"){
    next();
}
else{
    return res.status(401).send("unauthorized")
}
}