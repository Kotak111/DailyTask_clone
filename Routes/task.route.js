const taskController= require("../controller/user/task.controller")
const router=require("express").Router();
const {auth,IsUser,IsAdmin}=require("../utils/auth")

router.post("/taskadd",auth,IsUser,taskController.createTask)
router.get("/taskview",auth,IsAdmin,taskController.getAllTasks)
router.get("/:id",auth,IsAdmin,taskController.getTaskById)
router.delete("/:id",auth,IsAdmin,taskController.deleteTaskById)
router.put("/:id",auth,IsUser,taskController.updateTaskById)
router.get('/', auth,IsAdmin,taskController.filterSorting);
module.exports=router;