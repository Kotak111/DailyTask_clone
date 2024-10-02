const categoryController= require("../controller/user/category.controller")
const router=require("express").Router();
const {IsAdmin} =require("../utils/auth")

router.post("/cdd",IsAdmin,categoryController.createCategory)
router.get("/cview",IsAdmin,categoryController.getAllCategories)

module.exports=router;