const Usercontroller=require("../controller/user/user.controller")
const router=require("express").Router();
router.post("/signin",Usercontroller.create)
router.post("/login",Usercontroller.login)
router.post("/logout",Usercontroller.logout)
router.post("/sendmail",Usercontroller.resetmail)
router.post("/changepass",Usercontroller.resetpassword)
module.exports=router;