const Usercontroller=require("../controller/user/user.controller");
const loginLimiter = require("../limitLogin/Rate.limit");
const router=require("express").Router();
router.post("/signin",Usercontroller.create)
router.post("/login",loginLimiter,Usercontroller.login)
router.post("/logout",Usercontroller.logout)
router.post("/sendmail",Usercontroller.resetmail)
router.post("/changepass",Usercontroller.resetpassword)
module.exports=router;