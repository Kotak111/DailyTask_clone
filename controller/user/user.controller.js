
const bcrypt=require("bcryptjs");
const User = require("../../models/user/user.model");
const { hash } = require("../../middleware/hashpassword");
const { compare } = require("../../middleware/compare");
const jwt=require("jsonwebtoken");
const { generateToeken } = require("../../services/GenerateToken");
const crypto=require("crypto");
const sendData = require("../../config/mail");

exports.create = async(req,res)=>{
    try {
        const { username,email,password } = req.body;
        console.log(req.body);
        
            if (!email || !password || !username) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                })
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email"
                })
            }
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "password must be at letest 6 characters"
                })
            }
            const existingUserByEmail = await User.findOne({ email: email })
            if (existingUserByEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                })
            }
            const existingUserByUsername = await User.findOne({ username: username })
            if (existingUserByUsername) {
                return res.status(400).json({
                    success: false,
                    message: "username already exists"
                })
            }
    
           
          

            const hashpassword =await hash(password)
           const user=await User.create({
           username,
           email,
           password:hashpassword
           })
           if(user){
            res.status(200).json({
                success:true,
                message:"User Registration..."
            })
           }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
        
    }
}
exports.login =async(req,res)=>{
   try {
     const {email,password}=req.body;
     const user= await User.findOne({email:email})
     if(!user){
     res.status(404).json({
         success:false,
         message:"User Is Not register"
     })
    }
 
     const Ispassword= await compare(password,user.password)
     if(!Ispassword){
         res.status(404).json({
             success:false,
             message:"Invalid credential"
         })
     }
      generateToeken(user._id,user.role_id,res)
      res.status(200).json({
         success:true,
         user:{
             ...user._doc,
             password:""
         }
     })
   } catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Internal Server error"
    })
   }
}
exports.logout = async (req, res) => {
    try {
       
        res.clearCookie("jwt-token", {
            path: '/',
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'development', 
        });

       
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.resetmail = async (req, res) => {
    try {
        function generateOtp(length = 6) {
            const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
            return otp.padStart(length, '0');
        }

        const { email } = req.body;
        console.log(req.body);
        
        
        const IsMail = await User.findOne({ email: email });
        if (!IsMail) {
            return res.status(400).json({
                success: false,
                message: "No User Found.😫😫"
            });
        }

        const otp = generateOtp();
        
        
        const sendOtp = await User.findByIdAndUpdate(
            IsMail._id,
            { otp: otp },
            { new: true }
        );

        if (sendOtp) {
            console.log(`Send mail to ${IsMail.email}`);
            await sendData(IsMail.email, otp); 
            return res.json({
                success: true,
                message: "OTP sent successfully to your email. Please check your mail.😉😉"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while updating the OTP.😫😫"
            });
        }
    } catch (error) {
        console.error('Error in resetmail:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
exports.resetpassword =async (req,res)=>{
    const {email,otp,newPassword}=req.body;
        if(newPassword == ""){
            res.json("please enter New Password🤣🤣")
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
    const Ismail=await User.findOne({email:email})
    if(!Ismail){
        res.status(400).send("Email Dose Not Exists😫😫😫")
    }
    const IsOtp=await User.findOne({otp:otp})
    if(!IsOtp){
        res.json("wrong Otp please enter correct otp!😫😫")   
    }
    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(newPassword, salt);
     IsOtp.password= hashedPassword;
    
     IsOtp.otp =" ";
     await IsOtp.save();
     res.json("password changed successfully😉😉❤️")
    console.log("done");


}