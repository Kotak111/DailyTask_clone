const categoryController= require("../controller/user/category.controller")
const router=require("express").Router();
router.post("/cdd",categoryController.createCategory)
router.get("/cview",categoryController.getAllCategories)

module.exports=router;